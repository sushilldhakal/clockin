const connect = require("../config/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

module.exports = async (req, reply) => {
  try {
    const client = await connect();
    const users = client.db("clock-in-users").collection("users");
    const user = await users.findOne({ username: req.body.username });
    await client.close();

    if (!user) {
      return reply.status(401).send({
        status: "error",
        message: "Invalid username or password",
      });
    }

    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) {
      return reply.status(401).send({
        status: "error",
        message: "Invalid username or password",
      });
    }

    // Only users with role 'admin' can log in via admin panel (backward compat: no location => admin)
    const role = user.role || (user.location == null || user.location === "" ? "admin" : "user");
    if (role !== "admin") {
      return reply.status(403).send({
        status: "error",
        message: "Admin access only",
      });
    }

    const token = jwt.sign(
      {
        id: user.username,
        role: "admin",
        location: user.location || "",
      },
      keys.jwtSecret,
      { expiresIn: "8h" }
    );

    return reply.send({
      status: "success",
      token,
      location: user.location || "",
      role: "admin",
    });
  } catch (err) {
    req.log?.error(err);
    return reply.status(500).send({
      status: "error",
      message: "Login failed",
    });
  }
};
