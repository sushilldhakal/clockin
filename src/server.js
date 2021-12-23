const add_employee = require("./controllers/add_employee");
const admin_login = require("./controllers/admin_login");
const clock = require("./controllers/clock");
const employees = require("./controllers/employees");
const get_timesheets = require("./controllers/get_timesheets");
const login = require("./controllers/login");
const timesheets = require("./controllers/timesheets");
const get_staff_timesheets = require("./controllers/get_staff_timesheets");
const add_category = require("./controllers/add_category");
const get_category = require("./controllers/get_category");
const update_category = require("./controllers/update_category");
// const delete_category = require("./controllers/delete_category");

const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cors"));

fastify.get("/api/timesheets", timesheets);

fastify.get("/api/employees", employees);

fastify.post("/api/add-employee", add_employee);

fastify.post("/api/clock/:type", clock);

fastify.get("/api/get-timesheets/:pin", get_timesheets);

fastify.get("/api/timesheets/:staff_id", get_staff_timesheets);

fastify.post("/api/auth/login", login);

fastify.post("/api/auth/admin/login", admin_login);

fastify.post("/api/category/:category_type", add_category);

fastify.put("/api/category/:category_type/:category_id", update_category);

// fastify.delete("/api/category/:category_type/:category_id", delete_category);

fastify.get("/api/category/:category_type", get_category);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 4000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
