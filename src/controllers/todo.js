const Todo = require('../models/todo');
const User = require('../models/user');

const { ThrowErrorCustom } = require('../utils/errors');

async function create(req, res) {
    try {
        const { id_user: userIdReceived, description: descriptionReceived } = req.body;

        const getUser = await User.findByPk(userIdReceived);

        if (getUser == null) {
            throw new ThrowErrorCustom({
                message: "User doesn't exist",
                status: 404,
            });
        }

        if (!descriptionReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the item description",
                status: 400,
            });
        }

        if (!userIdReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the user id",
                status: 400,
            });
        }

        const doesTodoCreated = await Todo.create ({
            id_user: userIdReceived,
            description: descriptionReceived,
        })

        return res.json({doesTodoCreated});
    } catch (errors) {
        if (errors.type == 'ThrowErrorCustom') {
            console.log(`ERROR:`)
            console.log(`Message: ${errors.message}`)
            console.log(`Status: ${errors.status}`)
            return res.status(errors.status).send({ message: errors.message });
        } else {
            console.log(`ERROR:`)
            console.log(`Message: ${errors.errors[0].message}`)
            console.log(`Status: 404`)
            return res.status(404).send({ message: errors.errors[0].message });
        }
    }
}

async function read(req, res) {
    try {
        const { id_user: userIdReceived, id_todo: todoIdReceived } = req.body;

        const getTodo = await Todo.findByPk(todoIdReceived);

        if (!getTodo) {
            throw new ThrowErrorCustom({
                message: "Todo doesn't exist",
                status: 400,
            });
        }

        if (getTodo.id_todo === todoIdReceived) {
            if (getTodo.id_user !== userIdReceived) {
                throw new ThrowErrorCustom({
                    message: "No match for this todo and user",
                    status: 400,
                });
            }
        }

        return res.json({getTodo});

    } catch (errors) {
        if (errors.type == 'ThrowErrorCustom') {
            console.log(`ERROR:`)
            console.log(`Message: ${errors.message}`)
            console.log(`Status: ${errors.status}`)
            return res.status(errors.status).send({ message: errors.message });
        } else {
            console.log(`ERROR:`)
            console.log(`Message: ${errors.errors[0].message}`)
            console.log(`Status: 404`)
            return res.status(404).send({ message: errors.errors[0].message });
        }
    }
}

async function update(req, res) {
    try {
        const {
            id_user: userIdReceived,
            id_todo: todoIdReceived,
            description: descriptionReceived
        } = req.body;

        const getTodo = await Todo.findByPk(todoIdReceived);

        if (!getTodo) {
            throw new ThrowErrorCustom({
                message: "Todo doesn't exist",
                status: 400,
            });
        }

        if (getTodo.id_todo === todoIdReceived) {
            if (getTodo.id_user !== userIdReceived) {
                throw new ThrowErrorCustom({
                    message: "No match for this todo and user",
                    status: 400,
                });
            }
        }

        if (!descriptionReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the item description",
                status: 400,
            });
        }

        if (!todoIdReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the todo id",
                status: 400,
            });
        }

        if (!userIdReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the user id",
                status: 400,
            });
        }

        const doesTodoUpdated = await Todo.update({
                description: descriptionReceived,
            },
            {
                where: {
                    id_todo: todoIdReceived,
                    id_user: userIdReceived,
                }
            }
        )

        return res.send({message: "Todo atualizado com sucesso"}).json({doesTodoUpdated})
    } catch (errors) {
        if (errors.type == 'ThrowErrorCustom') {
            console.log(`ERROR:`)
            console.log(`Message: ${errors.message}`)
            console.log(`Status: ${errors.status}`)
            return res.status(errors.status).send({ message: errors.message });
        } else {
            console.log(`ERROR:`)
            console.log(`Message: ${errors.errors[0].message}`)
            console.log(`Status: 404`)
            return res.status(404).send({ message: errors.errors[0].message });
        }
    }
}

module.exports = {
    create,
    read,
    update
}