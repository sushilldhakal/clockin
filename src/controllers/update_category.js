const connect = require("../config/connect");
const { ObjectId } = require("bson");

module.exports = async (request, reply) => {
    const client = await connect();
    const db = client.db("clock-in-users");

    // update category
    const id = request.params.category_id;
    const {  value } = request.body;

    const exists = await db.collection("categories").findOne({ name: value });

    if(exists) {
        return reply.code(400).send({
            message: "Same name already exists"
        });
    }

    const category = await db.collection("categories").findOne({ _id: ObjectId(id) });
    
    const keys = {
        employer: 'hire',
        location: 'site',
        role: 'role'
    }

    if (category) {
        let update = await db.collection("categories").updateOne(
            { _id: ObjectId(id) },
            { $set: { name: value } }
        );

        update = await db.collection("employees").updateMany(
            { [keys[category.type]]: category.name },
            { $set: { [keys[category.type]]: value } }
        );

        console.log(category)
        
        client.close();

        if (update) {
            return reply.send({
                success: true,
                message: "Category updated successfully",
                category
            });
        }
    }

    client.close();

    return reply.send({
        success: false,
        message: "Category not found"
    });

};
