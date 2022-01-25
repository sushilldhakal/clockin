const connect = require("../config/connect");
const { ObjectId } = require("bson");
const moment = require("moment");

const updateTimeSheet = async (timesheet, pin, date, type, time, working) => {
  const exists = await timesheet.findOne({
    pin: pin,
    date: date,
    type: type,
  });

  let times = moment("2021-01-01 " + time).format("LLLL");

  console.log(exists);

  if (exists) {
    console.log({
      pin: pin,
      date: date,
      type: type,
    });
    await timesheet.updateOne(
      {
        pin: pin,
        date: date,
        type: type,
      },
      {
        $set: {
          time: times,
          working: "update",
        },
      }
    );
  } else {
    await timesheet.insertOne({
      pin: pin,
      date: date,
      type: type,
      time: times,
      working: "insert",
    });
  }
};

module.exports = async (request, reply) => {
  const client = await connect();
  const db = client.db("clock-in-users");
  const users = db.collection("employees");

  const { user_id, date } = request.body;

  const user = await users.findOne({
    _id: ObjectId(user_id),
  });

  const timesheet = db.collection("timesheets");

  if (request.body.out) {
    updateTimeSheet(timesheet, user.pin, date, "out", request.body.out);
  }
  if (request.body.in) {
    updateTimeSheet(timesheet, user.pin, date, "in", request.body.in);
  }
  if (request.body.break) {
    updateTimeSheet(timesheet, user.pin, date, "break", request.body.break);
  }
  if (request.body.endBreak) {
    updateTimeSheet(
      timesheet,
      user.pin,
      date,
      "endBreak",
      request.body.endBreak
    );
  }
  await client.close();
  return reply.send({
    success: true,
    message: "Timesheet updated successfully",
  });
};
