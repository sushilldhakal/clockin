const connect = require("../config/connect");
const moment = require("moment");

/** Return only fields needed for UI; do not expose email, phone, dob, etc. */
function toSafeUser(user) {
  if (!user) return null;
  const safe = {
    _id: user._id,
    name: user.name,
    role: user.role,
    pin: user.pin,
    site: user.site,
  };
  if (user.dob) {
    safe.birthday =
      moment(user.dob).format("MM-DD") === moment().format("MM-DD");
  }
  return safe;
}

module.exports = async (request, reply) => {
  const requestedPin = request.params.pin;
  const user = request.user;

  if (user.role === "staff" && user.pin !== requestedPin) {
    return reply.status(403).send({
      status: "error",
      message: "Access denied",
    });
  }

  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  const timesheets = await collection
    .find({
      pin: requestedPin,
      date: moment().format("DD-MM-yyyy"),
    })
    .map(({ type, date, time }) => ({ type, date, time }))
    .toArray();

  const employee = await db
    .collection("employees")
    .findOne({ pin: requestedPin });

  await client.close();

  if (!employee) {
    return reply.send({
      status: "error",
      message: "User not found",
    });
  }

  reply.send({
    timesheets,
    user: toSafeUser(employee),
    message: "Timesheets fetched successfully 1",
  });
};
