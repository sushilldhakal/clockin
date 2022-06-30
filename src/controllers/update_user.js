const connect = require("../config/connect");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");

    if(await db.collection('users').findOne({username: request.body.username, _id: {
        $ne: ObjectId(request.params.user_id)
    }})) {
        return reply.status(500).send({
            message: "Username already exists"
        })
    }

    await db
        .collection("users")
        .updateOne({ _id: ObjectId(request.params.user_id) }, {
            $set: {
                username: request.body.username,
                location: request.body.location,
                password: request.body.password ? bcrypt.hashSync(request.body.password, 10) : undefined
            }
        });

    await client.close();

    return reply.send({
        message: "User has been updated"
    });
};
