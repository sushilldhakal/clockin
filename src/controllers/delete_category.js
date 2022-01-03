const connect = require("../config/connect");
const { ObjectId } = require("bson");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  // delete category
  const id = request.params.category_id;
  const category = await db
    .collection("categories")
    .findOne({ _id: ObjectId(id) });

  if (category) {
    const remove = await db
      .collection("categories")
      .deleteOne({ _id: ObjectId(id) });

    client.close();

    if (remove) {
      return reply.send({
        success: true,
        message: "Category deleted successfully",
        category,
      });
    }
  }

  client.close();

  return reply.send({
    success: false,
    message: "Category not found",
  });
};
