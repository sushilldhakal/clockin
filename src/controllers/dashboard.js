const connect = require("../config/connect");
const moment = require("moment");
const { getPagination, paginatedResponse } = require("../utils/pagination");

module.exports = async (request, reply) => {
  const client = await connect();
  const user = request.user;
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  let filter = {};
  if (user && user.location) filter.site = user.location;
  if (user && user.id === "payable") filter.hire = { $ne: "Employees" };

  const employees = await db.collection("employees").find(filter).toArray();
  const pins = employees.map((e) => e.pin);

  const allTimesheets = await collection
    .find({
      pin: { $in: pins },
      date: moment().format("DD-MM-yyyy"),
    })
    .sort({ date: -1 })
    .toArray();

  let timesheets = allTimesheets.map((ts) => {
    const emp = employees.find((e) => e.pin === ts.pin);
    const time = ts.time ? moment(ts.time).format("h:mm a") : ts.time;
    if (emp) {
      const { name, role, hire, site, _id } = emp;
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
