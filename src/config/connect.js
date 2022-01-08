const uri = require("./keys").mongoURI;
const { MongoClient } = require("mongodb");
module.exports = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
};
