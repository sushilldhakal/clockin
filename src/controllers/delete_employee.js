<<<<<<< HEAD
const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("employees");

  // delete empoloyee
  const id = request.params.employee_id;

  const employee = await db
    .collection("categories")
    .findOne({ _id: ObjectId(id) });

  if (employee) {
    const remove = await db
      .collection("employee")
      .deleteOne({ _id: ObjectId(id) });

    client.close();

    if (remove) {
      return reply.send({
        success: true,
        message: "Staff deleted successfully",
        employee,
      });
    }
  }
};
=======
const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("employees");

  // update empoloyee
  const user = await collection.findOne({
    _id: ObjectId(request.params.employee_id)
  });

  await db
    .collection("employees")
    .deleteOne({ _id: ObjectId(request.params.employee_id) });

  // delete related timesheets using users pin
  await db.collection("timesheets").deleteMany({
    pin: user.pin
  });

  client.close();
  reply.send({
    message: "Employee deleted successfully"
  });
};
>>>>>>> 6e28a57e2555b697555ceef2ab57dce7657376aa
