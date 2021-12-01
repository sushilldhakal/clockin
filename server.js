const fastify = require('fastify')({ logger: true })
const { MongoClient } = require('mongodb');
fastify.register(require('fastify-cors'))
const moment = require('moment')

const connect = async () => {
    return new Promise((resolve, reject) => {
        const uri = "mongodb+srv://clock-in:vwvaR5YVffwzyrZo@testtravel.xcy06.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                reject(err)
            } else {
                resolve(client)
            }
        })
    })
}

fastify.post('/api/clock/:type', (request, reply) => {
    let data = { pin: request.body.pin, type: request.params.type, date: moment().format('DD-MM-yyyy') }
    connect().then((client) => {
        const collection = client.db("clock-in-users").collection("clock-in-data");
        collection.findOne(data).then(user => {
            if (user) {
                reply.send({
                    status: 'success',
                    message: 'User already clocked '+ request.params.type +' today'
                })
            } else {
                data.time = moment().format('HH:mm:ss')
                data.image = request.body.image
                collection.insertOne(data).then(() => {
                    reply.send({
                        status: 'success',
                        message: 'User clocked ' + request.params.type
                    })
                })
            }
        })
    }).catch(err => {
        reply.status(500).send({
            message: "error"
        })
    })
})

fastify.post('/api/auth/login', (req, reply) => {
    connect().then(async client => {
        const collection = client.db("clock-in-users").collection("users");
        collection.findOne({ pin: req.body.pin }).then(user => {
            if (user) {
                reply.send({
                    status: 'success',
                    user: user
                })
            } else {
                reply.status(404).send({
                    status: 'error',
                    message: 'User not found'
                })
            }

        })
    })
})

const start = async () => {
    try {
        await fastify.listen(4000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()