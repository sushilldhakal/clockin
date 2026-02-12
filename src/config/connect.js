const uri = require("./keys").mongoURI;
const { MongoClient } = require("mongodb");

module.exports = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
};
