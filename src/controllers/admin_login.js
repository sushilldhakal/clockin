const connect = require("../config/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (req, reply) => {
  connect().then(async (client) => {
    const users = await client.db("clock-in-users").collection("users");
    const user = await users.findOne({
      username: req.body.username,
    });
    if (user) {
      console.log(req.body.password, user.password);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(
          {
            id: req.body.username,
            location: user.location || ''
          },
          "secretssssssaxszxs",
          { expiresIn: "1h" }
        );
        return reply.send({
          status: "success",
          token,
        });
      }
    }
    return reply.status(404).send({
      status: "error",
      message: "Invalid username or password",
    });
  });
};
