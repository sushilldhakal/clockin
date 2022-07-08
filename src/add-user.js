const connect = require("./config/connect");
const bcrypt = require("bcrypt");
connect()
  .then((client) => {
    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "admin",
        password: bcrypt.hashSync("admin", 10),
      });
    //client.close();
  })
  .catch((err) => {
    console.log(err);
  });
