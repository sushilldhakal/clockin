const add_employee = require("./controllers/add_employee");
const admin_login = require("./controllers/admin_login");
const clock = require("./controllers/clock");
const employees = require("./controllers/employees");
const get_timesheets = require("./controllers/get_timesheets");
const login = require("./controllers/login");
const timesheets = require("./controllers/timesheets");

const fastify = require("fastify")({ logger: true });
fastify.register(require("fastify-cors"));





fastify.get("/api/timesheets", timesheets);

fastify.get("/api/employees", employees);

fastify.post("/api/add-employee",add_employee);

fastify.post("/api/clock/:type", clock);

fastify.get('/api/get-timesheets/:pin', get_timesheets);

fastify.post("/api/auth/login", login);

fastify.post('/api/auth/admin/login',admin_login);

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
