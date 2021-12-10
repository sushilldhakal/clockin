const connect = require("../config/connect");
const moment = require("moment");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");
    const collection = db.collection("employees");
    const employees = await collection.find({}).toArray();
    client.close();
    reply.send(employees);
  }