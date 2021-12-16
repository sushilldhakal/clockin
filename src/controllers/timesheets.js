const connect = require("../config/connect");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  const users = await db.collection("employees").find().toArray();

  const timesheets = await collection
    .find({
      date: moment().format("DD-MM-yyyy"),
    })
    .map(({ type, date, time, pin, image }) => {
      let user = users.filter((user) => user.pin === pin)[0];
      if(user) {
        let { name, role, hire, site } = user;
        return { type, date, time, name, pin, role, hire, site, image };
      }

      return { type, date, time, pin, image };

    })
    .toArray();
  client.close();

  reply.send({
    timesheets,
    message: "Timesheets fetched successfully 1",
  });
};
