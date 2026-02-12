const connect = require("../config/connect");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

/** Minimal fields for UI only; no email, phone, dob, etc. */
function toSafeUser(user) {
  if (!user) return null;
  return {
    _id: user._id,
    name: user.name,
    role: user.role,
    pin: user.pin,
    site: user.site,
  };
}

module.exports = async (req, reply) => {
  req.log?.info({ method: req.method, url: req.url, body: req.body }, "POST /api/auth/login hit");

  const pin = req.body?.pin?.toString?.().trim?.();
  if (!pin || !/^\d{4,}$/.test(pin)) {
    return reply.status(400).send({
      status: "error",
      message: "Invalid request",
    });
  }

  try {
    const client = await connect();
    const collection = client.db("clock-in-users").collection("employees");
    // Match pin: exact string, number, or string with leading zeros (e.g. "01899" in DB, "1899" from client)
    const pinNum = /^\d+$/.test(pin) ? Number(pin) : null;
    const pinQuery = {
      $or: [
        { pin },
        ...(pinNum != null ? [{ pin: pinNum }] : []),
        { pin: { $regex: new RegExp("^0*" + pin.replace(/^0+/, "") + "$") } },
      ],
    };
    const user = await collection.findOne(pinQuery);
    await client.close();

    if (!user) {
      req.log?.info({
        event: "pin_login_failed",
        reason: "user_not_found",
        pinFromRequest: pin,
        queryUsed: pinQuery,
      });
      return reply.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    req.log?.info({
      event: "pin_login_success",
      userId: user._id?.toString(),
    });

    const token = jwt.sign(
      {
        pin: user.pin,
        role: "staff",
        id: user._id?.toString(),
        name: user.name,
      },
      keys.jwtSecret,
      { expiresIn: "8h" }
    );

    return reply.send({
      status: "success",
      token,
      user: toSafeUser(user),
    });
  } catch (err) {
    req.log?.error(err);
    return reply.status(500).send({
      status: "error",
      message: "Login failed",
    });
  }
};
