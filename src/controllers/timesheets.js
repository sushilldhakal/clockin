const connect = require("../config/connect");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  const users = await db.collection("employees").find().toArray();

  let timesheets = await collection
    .find()
    .sort({ date: -1 })
    .map(({ type, date, time, pin, image }) => {
      let user = users.filter((user) => user.pin === pin)[0];

      if (time) {
        time = moment(time).format("h:mm a");
      }
      if (user) {
        let { name, role, hire, site } = user;
        return { type, date, time, name, pin, role, hire, site, image };
      }

      return { type, date, time, pin, image };
    })
    .toArray();

  timesheets = timesheets.filter((timesheet) => {
    if (
      moment(request.query.startDate, 'DD-MM-YYYY').isValid() &&
      moment(request.query.endDate, 'DD-MM-YYYY').isValid()
    ) {
      let startDate = moment(request.query.startDate, "DD-MM-YYYY");
      let endDate = moment(request.query.endDate, "DD-MM-YYYY");
      let timesheetDate = moment(timesheet.date, "DD-MM-YYYY");
      if (timesheetDate.isBetween(startDate, endDate, null, '[]')) {
        return true;
      }

      return false;
    }

    return true;
  });

  // filter record using user_id
  if (request.query.user_id) {
    // get pin from user_id
    let user = users.filter((user) => {
      return user._id.toString() === request.query.user_id;
    })[0];

    if (user) {
      timesheets = timesheets.filter((timesheet) => {
        return timesheet.pin === user.pin;
      });
    }
  }

  client.close();

  reply.send({
    timesheets,
    message: "Timesheets fetched successfully",
  });
};
