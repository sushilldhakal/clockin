const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");
const { getPagination, paginatedResponse } = require("../utils/pagination");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const user = await db
    .collection("employees")
    .find({ _id: new ObjectId(request.params.staff_id) })
    .toArray();
  if (!user || user.length === 0) {
    await client.close();
    return reply.status(404).send({ status: "error", message: "User not found" });
  }

  // When user has location (role 'user'), ensure requested employee belongs to that location
  const reqUser = request.user;
  if (reqUser && reqUser.location && user[0].site !== reqUser.location) {
    await client.close();
    return reply.status(403).send({ status: "error", message: "Access denied to this employee" });
  }
  let timesheets = await db
    .collection("timesheets")
    .find({
      pin: user[0].pin,
    })
    .toArray();
  let times = {};

  timesheets.map((timesheet) => {
    if (times[timesheet.date] === undefined) {
      times[timesheet.date] = {};
    }
    times[timesheet.date]["date"] = timesheet.date;
    times[timesheet.date][timesheet.type] = {};
    times[timesheet.date][timesheet.type] = moment(timesheet.time).format(
        "HH:mm:ss"
    );
    times[timesheet.date]["image" + timesheet.type] = timesheet.image;
    times[timesheet.date]["where" + timesheet.type] = timesheet.where;
    times[timesheet.date]["working" + timesheet.type] = timesheet.working;

    // moment add time difference in hours
  });

  times = Object.values(times)
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

      return t;
    })
    .sort((a, b) => {
      const dA = moment(a.date, "DD-MM-YYYY");
      const dB = moment(b.date, "DD-MM-YYYY");
      return dB.valueOf() - dA.valueOf();
    });

  const { page, limit, skip } = getPagination(request.query);
  const total = times.length;
  const data = times.slice(skip, skip + limit);

  await client.close();

  reply.send({
    ...paginatedResponse(data, total, page, limit),
    timesheets: data,
    user,
    user_id: request.params.staff_id,
    message: "Timesheets fetched successfully 1",
  });
};
