const connect = require("../config/connect");
const jwt = require('jsonwebtoken');

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");

  const token = jwt.decode(request.headers.api_key)

  let result = await db.collection("categories").find({
    type: request.params.category_type
  }).toArray();

  if (token && token.id === 'payable' && request.params.category_type === 'employer' ) {
    result = result.filter(r => {
      // return r.name === 'Employee';
      return !(r.name === 'Employee' || r.name === 'Employees')
    })
  }

  await client.close();

  return reply.send(result);
};
