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
  console.log(user);

  await db
    .collection("employees")
    .deleteOne({ _id: ObjectId(request.params.employee_id) });

  client.close();
  reply.send({
    message: "Employee deleted successfully"
  });
};
