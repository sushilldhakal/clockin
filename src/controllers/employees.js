const connect = require("../config/connect");
const { getPagination, paginatedResponse } = require("../utils/pagination");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const user = request.user;
  const collection = db.collection("employees");

  const filter =
    user && user.id === "payable"
      ? { hire: { $nin: ["Employee", "Employees"] } }
      : {};

  const total = await collection.countDocuments(filter);
  const { page, limit, skip } = getPagination(request.query);
  const employees = await collection.find(filter).skip(skip).limit(limit).toArray();

  await client.close();

  reply.send({
    ...paginatedResponse(employees, total, page, limit),
    data: employees,
  });
};
