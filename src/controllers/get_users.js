const connect = require("../config/connect");
const { getPagination, paginatedResponse } = require("../utils/pagination");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const filter = { username: { $ne: "admins" } };
  const total = await db.collection("users").countDocuments(filter);
  const { page, limit, skip } = getPagination(request.query);

  const result = await db
    .collection("users")
    .find(filter, { projection: { password: 0 } })
    .skip(skip)
    .limit(limit)
    .toArray();

  await client.close();

  return reply.send({
    ...paginatedResponse(result, total, page, limit),
    data: result,
  });
};
