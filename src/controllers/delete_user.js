const connect = require("../config/connect");
const { ObjectId } = require("mongodb");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");

    await db
        .collection("users")
        .deleteOne({ _id: ObjectId(request.params.user_id) })

    await client.close();

    return reply.send({
        message: "User has been deleted"
    });

};
