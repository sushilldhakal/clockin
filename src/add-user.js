const connect = require("./config/connect");
const bcrypt = require("bcrypt");
connect()
  .then((client) => {
    // add user in user collection
    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "summonshr",
        password: bcrypt.hashSync("summonshr", 10),
      });

    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "sushil@gmail.com",
        password: bcrypt.hashSync("sushil", 10),
      });

    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "admin",
        password: bcrypt.hashSync("admin", 10),
      });
      await client.close();
  })
  .catch((err) => {
    console.log(err);
  });
