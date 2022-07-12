const connect = require("../config/connect");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const auth = (request) => {
  if (request.headers.token === undefined) {
    throw new Error("Token not found");
  }

  return jwt.decode(request.headers.token);
};
module.exports = async (request, reply) => {
  const client = await connect();
  const user = auth(request);
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  let filter = {};

  if (user && user.location) {
    filter.site = user.location;
  }

  const token = jwt.decode(request.headers.token);
  if (token && token.id === "payable") {
    filter.hire = {
      $ne: "Employees",
    };
  }

  const users = await db.collection("employees").find(filter).toArray();

  const timesheets = await collection
    .find({
      pin: { $in: users.map((e) => e.pin) },
      date: moment().format("DD-MM-yyyy"),
    })
    .sort({ date: -1 })
    .map(({ type, date, time, pin, image, where }) => {
      let user = users.filter((user) => user.pin === pin)[0];

      if (time) {
        time = moment(time).format("HH:mm:ss");
      }
      if (user) {
        let { name, role, hire, site, _id } = user;
        return {
          _id,
          type,
          date,
          time,
          name,
          pin,
          role,
          hire,
          site,
          image,
          where,
        };
      }

      return { type, date, time, pin, image, where };
    })
    .toArray();

  await client.close();

  reply.send({
    timesheets,
    message: "Timesheets fetched successfully 1",
  });
};
