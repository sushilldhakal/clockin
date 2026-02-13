const connect = require("../config/connect");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");

    if(await db.collection('users').findOne({username: request.body.username, _id: {
        $ne: new ObjectId(request.params.user_id)
    }})) {
        await client.close();
        return reply.status(500).send({
            message: "Username already exists"
        });
    }

    const update = {
        username: request.body.username,
        location: request.body.location != null ? String(request.body.location).trim() : undefined,
    };
    if (request.body.role === "admin" || request.body.role === "user") {
        update.role = request.body.role;
        if (request.body.role === "user" && (!update.location || update.location === "")) {
            await client.close();
            return reply.status(400).send({
                message: "Location is required for users with role 'user'"
            });
        }
    }
    if (request.body.password) {
        update.password = bcrypt.hashSync(request.body.password, 10);
    }
    const $set = Object.fromEntries(Object.entries(update).filter(([, v]) => v !== undefined));

    await db
        .collection("users")
        .updateOne({ _id: new ObjectId(request.params.user_id) }, { $set });

    await client.close();

    return reply.send({
        message: "User has been updated"
    });
};
