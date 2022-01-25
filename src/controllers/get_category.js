const connect = require("../config/connect");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

    const result = await db.collection("categories").find({
        type: request.params.category_type
    }).toArray();

    await client.close();

    return reply.send(result);

};
