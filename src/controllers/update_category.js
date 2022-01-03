const connect = require("../config/connect");
const { ObjectId } = require("bson");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");

    // update category
    const id = request.params.category_id;
    const {  value } = request.body;


    const category = await db.collection("categories").findOne({ _id: ObjectId(id) });

    if (category) {
        const update = await db.collection("categories").updateOne(
            { _id: ObjectId(id) },
            { $set: { name: value } }
        );

        client.close();

        if (update) {
            return reply.send({
                success: true,
                message: "Category updated successfully",
                category
            });
        }
    }

    client.close();

    return reply.send({
        success: false,
        message: "Category not found"
    });






};
