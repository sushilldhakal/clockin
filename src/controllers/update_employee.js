const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require('moment')

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");
    const collection = db.collection("employees");

    // update empoloyee
    const user = await collection.findOne({ _id: ObjectId(request.params.employee_id) });
    console.log(user)

    const employee = {
        ...user,
        name: request.body.name,
        role: request.body.role,
        hire: request.body.hire,
        site: request.body.site,
        email: request.body.email,
        phone: request.body.phone,
        dob: request.body.dob,
        updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a")
    };
    await db.collection("employees").updateOne(
        { _id: ObjectId(request.params.employee_id) },
        { $set: { ...employee } }
    );

    client.close();
    reply.send({
        message: "Employee updated successfully",
        employee
    });
};
