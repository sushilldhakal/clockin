const connect = require("../config/connect");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const result = await db
    .collection("users")
    .find(
      {
        username: {
          $ne: "admins",
        },
      },
      {
        projection: {
          password: 0,
        },
      }
    )
    .toArray();

  await client.close();

  return reply.send(result);
};
