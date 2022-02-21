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
    .map(({ type, date, time, pin, image, where }) => {
      let user = users.filter((user) => user.pin === pin)[0];
      if (time) {
        time = moment(time).format("h:mm a");
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

  var staffNoImage = timesheets.filter(function (hero) {
    return hero.image == null;
  });
  var staffNoLocation = timesheets.filter(function (hero) {
    return hero.where == null && hero.image == null;
  });
  var staffNoLocationImage = timesheets.filter(function (hero) {
    return hero.where == "," || hero.where == null;
  });

  await client.close();

  reply.send({
    timesheets,
    staffNoImage,
    staffNoLocation,
    staffNoLocationImage,
    message: "Timesheets fetched successfully 1",
  });
};
