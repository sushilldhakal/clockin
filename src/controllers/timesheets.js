const connect = require("../config/connect");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  const users = await db.collection("employees").find().toArray();

  let timesheets = await collection
    .find().sort({ date: -1 })
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

    }).toArray()

  timesheets = timesheets.filter((timesheet) => {
    // filter record using startDate and endDate with format YYYY-MM-DD
    if (request.query.startDate && request.query.endDate) {
      let startDate = moment(request.query.startDate, "YYYY-MM-DD").subtract(1, "days");
      let endDate = moment(request.query.endDate, "YYYY-MM-DD").add(1, "days");
      let timesheetDate = moment(timesheet.date, "YYYY-MM-DD");

      if (timesheetDate.isBetween(startDate, endDate)) {
        return true;
      }

      return false
    } 
    return true
  })


  console.log(timesheets)
  client.close();

  reply.send({
    timesheets,
    message: "Timesheets fetched successfully 1",
  });
};
