const connect = require("../config/connect");
const bcrypt = require("bcrypt");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");
    const user  = await db.collection('users').findOne({ username: request.body.username });
    if (user) {
        await client.close();
        return reply.status(500).send({
            message: "Username already exists"
        });
    }

    // role: 'admin' or 'user'. 'user' = admin-like with location-based access; requires location
    const role = (request.body.role === "admin" ? "admin" : "user");
    const location = request.body.location ? String(request.body.location).trim() : "";

    if (role === "user" && !location) {
        await client.close();
        return reply.status(400).send({
            message: "Location is required for users with role 'user'"
        });
    }

    await db
        .collection("users")
        .insertOne({
            username: request.body.username,
            location,
            password: bcrypt.hashSync(request.body.password, 10),
            role,
        });

    await client.close();

    return reply.send({
        message: "User has been added"
    });
};
