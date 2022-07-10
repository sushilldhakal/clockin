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

const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cors"));

fastify.get("/api/category/:category_type", get_category);
fastify.get("/api/dashboard", dashboard);
fastify.get("/api/employees", employees);
fastify.get("/api/flag/image", flag_image);
fastify.get("/api/flag/location", flag_location);
fastify.get("/api/flag/imagelocation", flag_image_location);
fastify.get("/api/get-timesheets/:pin", get_timesheets);
fastify.get("/api/timesheets", timesheets);
fastify.get("/api/timesheets/:staff_id", get_staff_timesheets);
fastify.get("/api/users", get_users);
fastify.post("/api/add-employee", add_employee);
fastify.post("/api/auth/admin/login", admin_login);
fastify.post("/api/auth/login", login);
fastify.post("/api/category/:category_type", add_category);
fastify.post("/api/clock/:type", clock);
fastify.post("/api/employee/update/:employee_id", update_employee);
fastify.post("/api/update-timesheet", update_timesheet);
fastify.post("/api/user", add_user);
fastify.put("/api/user/:user_id", update_user);
fastify.put("/api/category/:category_type/:category_id", update_category);
fastify.delete("/api/user/:user_id", delete_user);
fastify.delete("/api/category/:category_type/:category_id", delete_category);
fastify.delete("/api/employees/:employee_id", delete_employee);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 4000, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
