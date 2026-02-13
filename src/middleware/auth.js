const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

/**
 * Extracts JWT from request (header "token" or "Authorization: Bearer <token>").
 * Verifies signature and expiry. Attaches decoded payload to request.user.
 * Returns 401 if missing, invalid, or expired.
 */
async function verifyJWT(request, reply) {
  const raw =
    request.headers.token ||
    request.headers.api_key ||
    (request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer ") &&
      request.headers.authorization.slice(7));

  if (!raw) {
    return reply.status(401).send({
      status: "error",
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(raw, keys.jwtSecret);
    request.user = decoded;
    return;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return reply.status(401).send({
        status: "error",
        message: "Token expired",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return reply.status(401).send({
        status: "error",
        message: "Invalid token",
      });
    }
    return reply.status(401).send({
      status: "error",
      message: "Authentication failed",
    });
  }
}

/**
 * Requires request.user.role === 'admin'. Use after verifyJWT.
 */
async function requireAdmin(request, reply) {
  if (!request.user) {
    return reply.status(401).send({
      status: "error",
      message: "Authentication required",
    });
  }
  if (request.user.role !== "admin") {
    return reply.status(403).send({
      status: "error",
      message: "Admin access required",
    });
  }
}

/**
 * Requires request.user.role === 'admin' or 'user' (dashboard access).
 * Blocks role 'staff' (PIN login) from admin-panel routes. Use after verifyJWT.
 */
async function requireDashboardAccess(request, reply) {
  if (!request.user) {
    return reply.status(401).send({
      status: "error",
      message: "Authentication required",
    });
  }
  const role = request.user.role;
  if (role !== "admin" && role !== "user") {
    return reply.status(403).send({
      status: "error",
      message: "Dashboard access required",
    });
  }
}

module.exports = { verifyJWT, requireAdmin, requireDashboardAccess };
