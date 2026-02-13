require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const moment = require("moment-timezone");
const { verifyJWT, requireAdmin, requireDashboardAccess } = require("./middleware/auth");
const add_category = require("./controllers/add_category");
const add_employee = require("./controllers/add_employee");
const admin_login = require("./controllers/admin_login");
const clock = require("./controllers/clock");
const dashboard = require("./controllers/dashboard");
const delete_category = require("./controllers/delete_category");
const delete_employee = require("./controllers/delete_employee");
const employees = require("./controllers/employees");
const flag_image = require("./controllers/flag_image");
const flag_location = require("./controllers/flag_location");
const flag_image_location = require("./controllers/flag_image_location");
const get_category = require("./controllers/get_category");
const get_staff_timesheets = require("./controllers/get_staff_timesheets");
const get_timesheets = require("./controllers/get_timesheets");
const get_users = require("./controllers/get_users");
const login = require("./controllers/login");
const timesheets = require("./controllers/timesheets");
const update_category = require("./controllers/update_category");
const update_employee = require("./controllers/update_employee");
const update_timesheet = require("./controllers/update_timesheet");
const update_user = require("./controllers/update_user");
const add_user = require("./controllers/add_user");
const delete_user = require("./controllers/delete_user");
const { clearOldTimesheetImages } = require("./deleteImage");

const fastify = require("fastify")({ logger: true });

fastify.register(require("@fastify/cors"));

// Log every request (so we can see if POST /api/auth/login reaches this server)
fastify.addHook("onRequest", async (request, reply) => {
  fastify.log.info({ method: request.method, url: request.url }, "incoming request");
});

// Public routes (no auth)
fastify.post("/api/auth/admin/login", admin_login);
fastify.post("/api/auth/login", login);
fastify.post("/api/auth/login/", login); // allow trailing slash

const authPre = [verifyJWT];
const adminPre = [verifyJWT, requireAdmin];
const dashboardPre = [verifyJWT, requireDashboardAccess];

// Admin-only routes (valid JWT + role === 'admin')
fastify.get("/api/users", { preHandler: adminPre }, get_users);
fastify.post("/api/user", { preHandler: adminPre }, add_user);
fastify.put("/api/user/:user_id", { preHandler: adminPre }, update_user);
fastify.delete("/api/user/:user_id", { preHandler: adminPre }, delete_user);
fastify.post("/api/add-employee", { preHandler: adminPre }, add_employee);
fastify.post("/api/employee/update/:employee_id", { preHandler: adminPre }, update_employee);
fastify.delete("/api/employees/:employee_id", { preHandler: adminPre }, delete_employee);
fastify.post("/api/category/:category_type", { preHandler: adminPre }, add_category);
fastify.put("/api/category/:category_type/:category_id", { preHandler: adminPre }, update_category);
fastify.delete("/api/category/:category_type/:category_id", { preHandler: adminPre }, delete_category);

// Dashboard routes (role admin or user; location-filtered for role 'user')
fastify.get("/api/category/:category_type", { preHandler: dashboardPre }, get_category);
fastify.get("/api/dashboard", { preHandler: dashboardPre }, dashboard);
fastify.get("/api/employees", { preHandler: dashboardPre }, employees);
fastify.get("/api/flag/image", { preHandler: dashboardPre }, flag_image);
fastify.get("/api/flag/location", { preHandler: dashboardPre }, flag_location);
fastify.get("/api/flag/imagelocation", { preHandler: dashboardPre }, flag_image_location);
fastify.get("/api/get-timesheets/:pin", { preHandler: authPre }, get_timesheets);
fastify.get("/api/timesheets", { preHandler: dashboardPre }, timesheets);
fastify.get("/api/timesheets/:staff_id", { preHandler: dashboardPre }, get_staff_timesheets);
fastify.post("/api/clock/:type", { preHandler: authPre }, clock);
fastify.post("/api/update-timesheet", { preHandler: authPre }, update_timesheet);

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function runOldImageCleanup() {
  return clearOldTimesheetImages()
    .then((r) => {
      if (r.ok) fastify.log.info({ count: r.count }, "Old timesheet images cleared (30+ days)");
      else fastify.log.warn("Old timesheet image cleanup failed");
      return r;
    })
    .catch((err) => {
      fastify.log.error(err, "Old timesheet image cleanup error");
      throw err;
    });
}

const CLEANUP_TIMEZONE = "Australia/Melbourne";

function scheduleOldImageCleanup() {
  const now = moment().tz(CLEANUP_TIMEZONE);
  const nextMidnight = now.clone().add(1, "day").startOf("day");
  const msUntilMidnight = nextMidnight.diff(now);

  fastify.log.info(
    { at: nextMidnight.format("YYYY-MM-DD HH:mm:ss z"), zone: CLEANUP_TIMEZONE },
    "Old image cleanup scheduled for midnight"
  );

  setTimeout(() => {
    runOldImageCleanup().finally(() => {
      setInterval(runOldImageCleanup, ONE_DAY_MS);
    });
  }, msUntilMidnight);
}

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
    scheduleOldImageCleanup();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start().then(r => console.log(r));
