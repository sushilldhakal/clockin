const connect = require("../config/connect");
const bcrypt = require("bcrypt");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");
    const user  = await db.collection('users').findOne({ username: request.body.username });
    if (user) {
        return reply.status(500).send({
            message: "Username already exists"
        })
    }

    await db
        .collection("users")
        .insertOne({
            username: request.body.username,
            location: request.body.location,
            password: bcrypt.hashSync(request.body.password, 10),
            role: "user",
        });

    await client.close();

    return reply.send({
        message: "User has been updated"
    });
};
