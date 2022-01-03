const connect = require("../config/connect");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  const users = await db.collection("employees").find().toArray();

  const timesheets = await collection
    .find()
    .sort({ date: -1 })
    .map(({ type, date, time, pin, image }) => {
      let user = users.filter((user) => user.pin === pin)[0];

      if (time) {
        time = moment(time).format("h:mm a");
      }
      if (user) {
        let { name, role, hire, site, _id } = user;
        return { _id, type, date, time, name, pin, role, hire, site, image };
      }

      return { type, date, time, pin, image };
    })
    .toArray();

  client.close();

  reply.send({
    users,

    timesheets,

    message: "Timesheets fetched successfully 1",
  });
};
