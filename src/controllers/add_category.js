const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const result = await db.collection("categories").insertOne({
    name: request.body.value,
    type: request.params.category_type,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  await client.close();

  return reply.send(result);
};
