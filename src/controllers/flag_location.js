const connect = require("../config/connect");
const moment = require("moment");
const { getPagination, paginatedResponse } = require("../utils/pagination");

const DAYS_LIMIT = 60;

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");
  const empFilter = request.user && request.user.location ? { site: request.user.location } : {};
  const users = await db.collection("employees").find(empFilter).toArray();

  const filterCutoff = moment().subtract(DAYS_LIMIT, "days").startOf("day");

  const allTimesheets = await collection
    .find({
      pin: { $in: users.map((e) => e.pin) },
      $or: [
        {
          lat: null,
        },
        {
          lat: "",
        },
      ],
    })
    .toArray();

  const allWithinRange = allTimesheets.filter((ts) => {
    const docMoment = ts.time ? moment(ts.time) : moment(ts.date, "DD-MM-YYYY");
    return docMoment.isValid() && docMoment.isSameOrAfter(filterCutoff);
  });

  let timesheets = allWithinRange.map((ts) => {
    const user = users.find((u) => u.pin === ts.pin);
    const time = ts.time ? moment(ts.time).format("h:mm a") : ts.time;
    if (user) {
      const { name, role, hire, site, _id } = user;
      return { _id, type: ts.type, date: ts.date, time, name, pin: ts.pin, role, hire, site, image: ts.image, where: ts.where };
    }
    return { type: ts.type, date: ts.date, time, pin: ts.pin, image: ts.image, where: ts.where };
  });

  const { page, limit, skip } = getPagination(request.query);
  const total = timesheets.length;
  const data = timesheets.slice(skip, skip + limit);

  await client.close();

  reply.send({
    ...paginatedResponse(data, total, page, limit),
    timesheets: data,
    message: "Timesheets fetched successfully 1",
  });
};
