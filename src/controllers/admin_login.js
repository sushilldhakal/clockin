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

    // Allow role 'admin' or role 'user' (admin-like users with location-based access)
    // Backward compat: no role + no location => admin; no role + has location => user
    const role = user.role || (user.location == null || user.location === "" ? "admin" : "user");
    if (role !== "admin" && role !== "user") {
      return reply.status(403).send({
        status: "error",
        message: "Access denied",
      });
    }

    // role 'user' must have a location for filtering employee/dashboard data
    const location = (user.location && String(user.location).trim()) || "";
    if (role === "user" && !location) {
      return reply.status(403).send({
        status: "error",
        message: "Location required for this role. Contact admin.",
      });
    }

    const token = jwt.sign(
      {
        id: user.username,
        role,
        location,
      },
      keys.jwtSecret,
      { expiresIn: "8h" }
    );

    return reply.send({
      status: "success",
      token,
      location,
      role,
    });
  } catch (err) {
    req.log?.error(err);
    return reply.status(500).send({
      status: "error",
      message: "Login failed",
    });
  }
};
