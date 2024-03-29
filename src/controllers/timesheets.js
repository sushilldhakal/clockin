const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");
const jwt = require('jsonwebtoken')

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  let filter = {};

  const token = jwt.decode(request.headers.api_key)
  if (token && token.id === 'payable') {
    filter.hire= {
      $ne: 'Employees'
    }
  }

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
      return timesheetDate.isBetween(startDate, endDate, null, "[]");
    }

    return true;
  });

  let timeCollection = [];

  timesheets.map((timesheet) => {
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

    times["date"] = timesheet.date;
    times["pin"] = timesheet.pin;
    times[timesheet.type] = {};
    times[timesheet.type] = moment(timesheet.time).format("HH:mm:ss");

    timeCollection.push(times);
  });

  let times = Object.values(timeCollection)
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

      return timesheet.site;

    });

  await client.close();

  reply.send({
    timesheets: times,
    user,
    user_id: request.params.staff_id,
    message: "Timesheets fetched successfully",
  });
};
