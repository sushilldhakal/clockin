const connect = require("../config/connect");

module.exports = (req, reply) => {
    connect().then(async (client) => {
      const collection = client.db("clock-in-users").collection("employees");
      collection.findOne({ pin: req.body.pin }).then((user) => {
        if (user) {
          reply.send({
            status: "success",
            user: user,
          });
        } else {
          reply.status(404).send({
            status: "error",
            message: "User not found"
          });
        }
        client.close()
      });
    });
  }