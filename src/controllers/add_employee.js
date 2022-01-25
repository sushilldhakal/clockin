const connect = require("../config/connect");
const moment = require("moment");

module.exports = async (request, reply) => {
<<<<<<< HEAD
    const client = await connect();
    const db = client.db("clock-in-users");
    const collection = db.collection("employees");
    // check if collection already has users with same pin
    const user = await collection.findOne({ pin: request.body.pin });
    if (user) {
        client.close();
        reply.status(500).send({
            message: "User with this pin already exists"
        });
    }
    const employee = {
        ...request.body,
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a")
    };
    await collection.insertOne(employee);
    await client.close();
    reply.send({
        message: "Employee added successfully",
        employee
=======
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("employees");
  // check if collection already has users with same pin
  const user = await collection.findOne({ pin: request.body.pin });
  if (user) {
    client.close();
    reply.status(500).send({
      message: "User with this pin already exists",
>>>>>>> c4becd976e17199180f9134e72d55b6107e47ddb
    });
  }
  const employee = {
    ...request.body,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  };
  await collection.insertOne(employee);
  client.close();
  reply.send({
    message: "Employee added successfully",
    employee,
  });
};
