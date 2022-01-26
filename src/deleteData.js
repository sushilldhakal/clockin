const { MongoClient } = require("mongodb");
const moment = require('moment')
const uri = `mongodb+srv://clock-in:vwvaR5YVffwzyrZo@testtravel.xcy06.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function deleteData() {
  const mongo = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await mongo.connect();

    const db = mongo.db("clock-in-users");

    const collection = db.collection("timesheets");

    // fetch all timesheets
    const timesheets = await collection.find({
    }, { date: 1, _id: 1 }).toArray();

    let deletableIds = timesheets.filter(timesheet => {
      return moment(timesheet.date, 'DD-MM-YYYY').isBefore(moment().subtract('60', 'days'), 'day')
    }).map(timesheet => {
      return timesheet._id;
    })

    await collection.deleteMany({
      _id: {
        $in: deletableIds
      }
    })

    await mongo.close();


  } catch (err) {
    console.log(err);
  }
}

deleteData()