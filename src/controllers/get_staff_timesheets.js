const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const user = await db
    .collection("employees")
    .find(ObjectId(request.params.staff_id))
    .toArray();
  let timesheets = await db
    .collection("timesheets")
    .find({
      pin: user[0].pin,
    })
    .toArray();
  let times = {};

  timesheets = timesheets.map((timesheet) => {
    if (times[timesheet.date] === undefined) {
      times[timesheet.date] = {};
    }
    times[timesheet.date]["date"] = timesheet.date;
    times[timesheet.date][timesheet.type] = {};
    times[timesheet.date][timesheet.type] = moment(timesheet.time).format(
      "HH:mm:ss"
    );
    times[timesheet.date]["image" + timesheet.type] = timesheet.image;

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
    timesheets: times,
    user,
    user_id: request.params.staff_id,
    message: "Timesheets fetched successfully 1",
  });
};
