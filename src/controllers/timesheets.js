const connect = require("../config/connect");


module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");
    const collection = db.collection("timesheets");
    const timesheets = await collection.find({}).toArray();
    client.close();
    reply.send(timesheets);
}