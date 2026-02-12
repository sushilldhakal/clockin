require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const connect = require("./config/connect");
const bcrypt = require("bcrypt");
connect()
  .then((client) => {
    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "portmelbourne",
        password: bcrypt.hashSync("portmelbourne@123", 10),
        location: "Port Melbourne",
        role: "user",
      });

    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "dandenong",
        password: bcrypt.hashSync("dandenong@123", 10),
        location: "Dandenong",
        role: "user",
      });
    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "tullamarine",
        password: bcrypt.hashSync("tullamarine@123", 10),
        location: "Tullamarine",
        role: "user",
      });

    client
      .db("clock-in-users")
      .collection("users")
      .insertOne({
        username: "admin",
        password: bcrypt.hashSync("admin@123", 10),
        role: "admin",
      });
    //client.close();
  })
  .catch((err) => {
    console.log(err);
  });
