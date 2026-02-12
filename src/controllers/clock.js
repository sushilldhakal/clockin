const connect = require("../config/connect");
const moment = require("moment-timezone");

module.exports = async (request, reply) => {
  if (request.body.pin == null || request.body.pin === "") {
    return reply.status(400).send({
      status: "error",
      message: "Invalid pin",
    });
  }

  const user = request.user;
  if (user.role === "staff" && request.body.pin !== user.pin) {
    return reply.status(403).send({
      status: "error",
      message: "Access denied",
    });
  }

  const data = {
    pin: request.body.pin,
    type: request.params.type,
    date: moment().tz("Australia/melbourne").format("DD-MM-yyyy"),
  };

  try {
    const client = await connect();
    const collection = client.db("clock-in-users").collection("timesheets");
    const existing = await collection.findOne(data);

    if (existing) {
      await client.close();
      return reply.send({
        status: "success",
        message: "User already clocked " + request.params.type + " today",
      });
    }

    data.time = moment().tz("Australia/melbourne").format("LLLL");
    data.image = request.body.image;
    data.lat = request.body.lat;
    data.lng = request.body.lng;
    data.where = data.lat + "," + data.lng;
    data.flag = false;
    await collection.insertOne(data);
    await client.close();

    reply.send({
      status: "success",
      message: "User clocked " + request.params.type,
    });
  } catch (err) {
    request.log?.error(err);
    reply.status(500).send({
      status: "error",
      message: "Error recording clock",
    });
  }
};
