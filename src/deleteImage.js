require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { MongoClient } = require("mongodb");
const moment = require("moment");

const DAYS_OLD = 30;

/**
 * Clears the image field for all timesheet records older than DAYS_OLD days.
 * Safe to call from the server on a schedule or run manually: node src/deleteImage.js
 */
async function clearOldTimesheetImages() {
  const uri = process.env.mongoURI;
  if (!uri) {
    console.error("mongoURI not set in .env");
    return { ok: false, count: 0 };
  }

  const mongo = new MongoClient(uri);

  try {
    await mongo.connect();
    const db = mongo.db("clock-in-users");
    const collection = db.collection("timesheets");

    const cutoff = moment().subtract(DAYS_OLD, "days").startOf("day");

    const timesheets = await collection
      .find({}, { projection: { date: 1, _id: 1 } })
      .toArray();

    const deletableIds = timesheets
      .filter((ts) => {
        const docMoment = moment(ts.date, "DD-MM-YYYY");
        return docMoment.isValid() && docMoment.isBefore(cutoff, "day");
      })
      .map((ts) => ts._id);

    if (deletableIds.length === 0) {
      await mongo.close();
      return { ok: true, count: 0 };
    }

    const result = await collection.updateMany(
      { _id: { $in: deletableIds } },
      { $set: { image: "" } }
    );

    await mongo.close();
    return { ok: true, count: result.modifiedCount };
  } catch (err) {
    console.error("clearOldTimesheetImages error:", err);
    await mongo.close().catch(() => {});
    return { ok: false, count: 0 };
  }
}

// Run when executed directly: node src/deleteImage.js
if (require.main === module) {
  clearOldTimesheetImages().then((r) => {
    console.log(
      r.ok
        ? `Images older than ${DAYS_OLD} days cleared. Modified: ${r.count}`
        : "Cleanup failed."
    );
  });
}

module.exports = { clearOldTimesheetImages, DAYS_OLD };
