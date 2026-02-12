const connect = require("../config/connect");
const { ObjectId } = require("bson");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const id = request.params.category_id;

  const category = await db
    .collection("categories")
    .findOne({ _id: new ObjectId(id) });

  if (category) {
    const remove = await db
      .collection("categories")
      .deleteOne({ _id: new ObjectId(id) });

    await client.close();

    if (remove) {
      return reply.send({
        success: true,
        message: "Category deleted successfully",
        category,
      });
    }
  }

  await client.close();

  return reply.send({
    success: false,
    message: "Category not found",
  });
};
