const connect = require("../config/connect");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  const timesheets = await collection
    .find({
      pin: request.params.pin,
      date: moment().format("DD-MM-yyyy"),
    })
    .map(({ type, date, time }) => ({ type, date, time }))
    .toArray();

  const user = await db
    .collection("employees")
    .findOne({ pin: request.params.pin });

  client.close();

  if (!user) {
    // send error response
    return reply.send({
      status: "error",
      message: "User not found",
    });
  }

  reply.send({
    timesheets,
    user: user,
    message: "Timesheets fetched successfully 1",
  });
};
