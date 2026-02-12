const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const collection = db.collection("employees");

  const user = await collection.findOne({
    _id: new ObjectId(request.params.employee_id),
  });

  if(request.body.pin !== user.pin) {
    const alreadyExists = await db.collection("employees").findOne({
      pin: request.body.pin,
      _id: {
        $ne: new ObjectId(request.params.employee_id)
      } 
    })
    if(alreadyExists) {
      return reply.status(500).send({
        message: "Pin code already exists"
      })
    }
  }

  const employee = {
    ...user,
    name: request.body.name,
    pin: request.body.pin,
    role: request.body.role,
    hire: request.body.hire,
    site: request.body.site,
    email: request.body.email,
    phone: request.body.phone,
    dob: request.body.dob,
    comment: request.body.comment,
    img: request.body.img,
    updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  };

  await db
    .collection("employees")
    .updateOne(
      { _id: new ObjectId(request.params.employee_id) },
      { $set: { ...employee } }
    );

  if (request.body.pin != user.pin) {
    await db
      .collection("timesheets")
      .updateMany({ pin: user.pin }, { $set: { pin: request.body.pin } });
  }

  await client.close();
  reply.send({
    message: "Employee updated successfully",
    employee,
  });
};
