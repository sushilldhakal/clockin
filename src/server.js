const fastify = require("fastify")({ logger: true });
const { MongoClient } = require("mongodb");
fastify.register(require("fastify-cors"));
const moment = require("moment");



// DB Config
const uri = require("./config/keys").mongoURI;
const connect = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
};

//route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.get("/api/timesheets", async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");
  const timesheets = await collection.find({}).toArray();
  client.close();
  reply.send(timesheets);
});

fastify.get("/api/employees", async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("employees");
  const employees = await collection.find({}).toArray();
  client.close();
  reply.send(employees);
});

fastify.post("/api/add-employee", async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("employees");
  // check if collection already has users with same pin
  const user = await collection.findOne({ pin: request.body.pin });
  if (user) {
    client.close();
    reply.send({
      message: "User with this pin already exists"
    });
  }
  const employee = {
    ...request.body,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a")
  };
  await collection.insertOne(employee);
  client.close();
  reply.send({
    message: "Employee added successfully",
    employee
  });
});

fastify.post("/api/clock/:type", (request, reply) => {
  let data = {
    pin: request.body.pin,
    type: request.params.type,
    date: moment().format("DD-MM-yyyy")
  };
  connect()
    .then((client) => {
      const collection = client.db("clock-in-users").collection("timesheets");
      collection.findOne(data).then((user) => {
        if (user) {
          reply.send({
            status: "success",
            message: "User already clocked " + request.params.type + " today"
          });
        } else {
          data.time = moment().format("HH:mm:ss");
          data.image = request.body.image;
          collection.insertOne(data).then(() => {
            reply.send({
              status: "success",
              message: "User clocked " + request.params.type
            });
           client.close();
          });
        }
      });
    })
    .catch((err) => {
      reply.status(500).send({
        message: "error"
      });
    });
});

fastify.get('/api/get-timesheets/:pin', async (request, reply) => {
  
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");
  
  const timesheets = await collection.find({ 
    pin: request.params.pin,
    date: moment().format("DD-MM-yyyy")
  }).map(({type, date, time})=>({type, date, time})).toArray();

  const user = await db.collection('employees').findOne({ pin: request.params.pin });

  client.close();

  if (!user) {
    // send error response
    return reply.send({
      status: "error",
      message: "User not found"
    });
  } 

  reply.send({
    timesheets,
    user: user,
    message: "Timesheets fetched successfully 1"
  });

});

fastify.post("/api/auth/login", (req, reply) => {
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
});



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
