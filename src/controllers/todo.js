const Todo = require('../models/todo');

async function create(req, res) {
    try {
        const { description: descriptionReceived, id_user: userIdReceived } = req.body;
        if (!descriptionReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the item description",
                status: 400,
            });
        }

        const doesTodoCreated = await Todo.create({
            id_user: userIdReceived,
            description: descriptionReceived,
        })
        console.log(todo)
        return res.json({doesTodoCreated});

    } catch (error) {
        console.log(error)
        return res.status(error.status).send({ message: error.message });
    }
}

module.exports = {
    create
}