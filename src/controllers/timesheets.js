const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  let filter = {}

  if(request.query.user_id) {
    filter = {
      _id: ObjectId(request.query.user_id)
    }
  }
  
  let user = await db.collection("employees").find(filter).toArray();

  filter = {}

  if(request.query.user_id) {
    filter = {
      pin: user[0].pin
    }
  }

  let timesheets = await db.collection("timesheets").find(filter).toArray();

  timesheets = timesheets.filter((timesheet) => {
    if (
      moment(request.query.startDate, 'YYYY-MM-DD').isValid() &&
      moment(request.query.endDate, 'YYYY-MM-DD').isValid()
    ) {
      let startDate = moment(request.query.startDate, "YYYY-MM-DD");
      let endDate = moment(request.query.endDate, "YYYY-MM-DD");
      let timesheetDate = moment(timesheet.date, "DD-MM-YYYY");
      if (timesheetDate.isBetween(startDate, endDate, null, '[]')) {
        return true;
      }

      return false;
    }


    return true;
  });

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
        times[timesheet.date]["_id"] = users._id;
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
  })

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
  }).filter(timesheet => {
    if(request.query.hire) {
      return request.query.hire === timesheet.hire;
    }
    return true;
  });

  client.close();

  reply.send({
    // mergedArr,
    timesheets: times,
    user,
    user_id: request.params.staff_id,
    message: "Timesheets fetched successfully",
  });
};
