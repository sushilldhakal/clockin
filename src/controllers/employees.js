const connect = require("../config/connect");
const jwt = require("jsonwebtoken");

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const token = jwt.decode(request.headers.api_key);
  const collection = db.collection("employees");
  let employees = await collection.find({}).toArray();
  if (token && token.id === "payable") {
    employees = employees.filter((r) => {
      return r.hire !== "Employees";
    });
  }
  await client.close();
  reply.send(employees);
};
