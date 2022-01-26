const connect = require("./config/connect");
const bcrypt = require("bcrypt");
connect()
  .then((client) => {
    // add user in user collection
    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "Portmelbourne",
        password: bcrypt.hashSync("portmelbourne", 10),
        location: "Port melbourne",
      });

    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "dandenong",
        password: bcrypt.hashSync("sushil", 10),
        location: "Dandenong",
      });
    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "tullamarine",
        password: bcrypt.hashSync("sushil", 10),
        location: "Tullamarine",
      });

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
