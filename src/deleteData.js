const { MongoClient } = require("mongodb");
const moment = require("moment");
const uri = `mongodb+srv://clock-in:vwvaR5YVffwzyrZo@testtravel.xcy06.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err, client) => {
  const db = client.db("clock-in-users");
  const collection = db.collection("timesheets");

  if (err) throw err;
  var myquery = {
    date: {
      $lte: "15-01-2022",
    },

    //date: "15-01-2022",
  };
  db.collection("timesheets").deleteMany(myquery, function (err, obj) {
    if (err) throw err;
    console.log(obj.result + " document(s) deleted");
    client.close();
  });
});
