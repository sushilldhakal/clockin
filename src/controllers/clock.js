const connect = require("../config/connect");
//const moment = require("moment");
const moment = require("moment-timezone");

module.exports = (request, reply) => {
  if (request.body.pin === null) {
    return reply
      .response({
        status: "error",
        message: "Invalid pin",
      })
      .code(400);
  }
  let data = {
    pin: request.body.pin,
    type: request.params.type,
    date: moment().tz("Australia/melbourne").format("DD-MM-yyyy"),
  };
  connect()
    .then((client) => {
      const collection = client.db("clock-in-users").collection("timesheets");
      collection.findOne(data).then((user) => {
        if (user) {
          reply.send({
            status: "success",
            message: "User already clocked " + request.params.type + " today",
          });
        } else {
          data.time = moment().tz("Australia/melbourne").format("LLLL");
          data.image = request.body.image;
          data.lat = request.body.lat;
          data.lng = request.body.lng;
          data.where = data.lat + "," + data.lng;
          data.flag = false;
          collection.insertOne(data).then(async () => {
            await client.close();
            reply.send({
              status: "success",
              message: "User clocked " + request.body.lat,
            });
          });
        }
      });
    })
    .catch(() => {
      reply.status(500).send({
        message: "error",
      });
    });
};
