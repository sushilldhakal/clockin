const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  let filter = {};

  if (request.query.user_id) {
    filter._id = ObjectId(request.query.user_id);
  }

  if (request.query.location) {
    filter.site = request.query.location;
  }

  let user = await db.collection("employees").find(filter).toArray();

  filter = {};

  if (request.query.user_id) {
    filter = {
      pin: user[0].pin,
    };
  }

  // if (request.query.startDate && request.query.endDate) {
  //   filter.date = {
  //     $gte: moment(request.query.startDate).startOf("day").format('DD-MM-yyyy'),
  //     $lte: moment(request.query.endDate).endOf("day").format('DD-MM-yyyy'),
  //   };
  // }

  let timesheets = await db
    .collection("timesheets")
    .find(filter, {
      projection: {
        image: 0,
      },
    })
    .toArray();

  timesheets = timesheets.filter((timesheet) => {
    if (
      moment(request.query.startDate, "YYYY-MM-DD").isValid() &&
      moment(request.query.endDate, "YYYY-MM-DD").isValid()
    ) {
      let startDate = moment(request.query.startDate, "YYYY-MM-DD");
      let endDate = moment(request.query.endDate, "YYYY-MM-DD");
      let timesheetDate = moment(timesheet.date, "DD-MM-YYYY");
      if (timesheetDate.isBetween(startDate, endDate, null, "[]")) {
        return true;
      }

      return false;
    }

    return true;
  });

  let timeCollection = [];

  timesheets = timesheets.map((timesheet) => {
    let times = {};

    let alreadyExists = timeCollection.filter(
      (time) => time.date === timesheet.date && timesheet.pin === time.pin
    );

    if (alreadyExists.length > 0) {
      times = alreadyExists[0];
      timeCollection = timeCollection.filter(
        (time) => time.date !== timesheet.date || timesheet.pin !== time.pin
      );
    }

    users = user.map((users) => {
      if (users.pin === timesheet.pin) {
        times["name"] = users.name;
        times["role"] = users.role;
        times["site"] = users.site;
        times["hire"] = users.hire;
        times["_id"] = users._id;
        times["comment"] = users.comment;
      }
    });

    times["date"] = timesheet.date;
    times["pin"] = timesheet.pin;
    times[timesheet.type] = {};
    times[timesheet.type] = moment(timesheet.time).format("HH:mm:ss");

    timeCollection.push(times);
  });

  times = Object.values(timeCollection)
    .map((t) => {
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

      t.in = moment(t.in, "hh:mm a").format("LT");
      t.break = moment(t.break, "hh:mm a").format("LT");
      t.endBreak = moment(t.endBreak, "hh:mm a").format("LT");
      t.out = moment(t.out, "hh:mm a").format("LT");
      return t;
    })
    .filter((timesheet) => {
      if (request.query.hire) {
        return request.query.hire === timesheet.hire;
      }

      if (!timesheet.site) {
        return false;
      }
      return true;
    });

  await client.close();

  reply.send({
    timesheets: times,
    user,
    user_id: request.params.staff_id,
    message: "Timesheets fetched successfully",
  });
};
