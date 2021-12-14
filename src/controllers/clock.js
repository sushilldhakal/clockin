const connect = require("../config/connect");
const moment = require("moment");

module.exports = (request, reply) => {
    let data = {
        pin: request.body.pin,
        type: request.params.type,
        date: moment().format("DD-MM-yyyy")
    };
    connect()
        .then((client) => {
            const collection = client.db("clock-in-users").collection("timesheets");
            collection.findOne(data).then((user) => {
                if (user) {
                    reply.send({
                        status: "success",
                        message: "User already clocked " + request.params.type + " today"
                    });
                } else {
                    data.time = moment().format("HH:mm:ss");
                    data.image = request.body.image;
                    collection.insertOne(data).then(() => {
                        reply.send({
                            status: "success",
                            message: "User clocked " + request.params.type
                        });
                        client.close();
                    });
                }
            });
        })
        .catch((err) => {
            reply.status(500).send({
                message: "error"
            });
        });
}