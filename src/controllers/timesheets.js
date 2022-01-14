const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const user = await db.collection("employees").find().toArray();
  let timesheets = await db.collection("timesheets").find().toArray();

  let times = {};
  let users = {};

  timesheets = timesheets.map((timesheet) => {
    if (times[timesheet.date] === undefined) {
      times[timesheet.date] = {};
    }

    users = user.map((users) => {
      if (users.pin === timesheet.pin) {
        times[timesheet.date]["name"] = users.name;
        times[timesheet.date]["role"] = users.role;
        times[timesheet.date]["site"] = users.site;
        times[timesheet.date]["hire"] = users.hire;
        times[timesheet.date]["id"] = users._id;
        times[timesheet.date]["comment"] = users.comment;
      }
    });

    times[timesheet.date]["date"] = timesheet.date;
    times[timesheet.date]["pin"] = timesheet.pin;
    times[timesheet.date][timesheet.type] = {};
    times[timesheet.date][timesheet.type] = moment(timesheet.time).format(
      "HH:mm:ss"
    );
    // moment add time difference in hours
  });

  times = Object.values(times).map((t) => {
    if (t.break && t.endBreak)
      t.btotal = moment
        .duration(
          moment(t.endBreak, "HH:mm:ss").diff(moment(t.break, "HH:mm:ss"))
        )
        .asHours()
        .toFixed(2);

    if (t.in && t.out)
      t.total = moment
        .duration(moment(t.out, "HH:mm:ss").diff(moment(t.in, "HH:mm:ss")))
        .asHours()
        .toFixed(2);

    return t;
  });

  client.close();

  reply.send({
    // mergedArr,
    timesheets: times,
    user,
    user_id: request.params.staff_id,
    message: "Timesheets fetched successfully 1",
  });
};
