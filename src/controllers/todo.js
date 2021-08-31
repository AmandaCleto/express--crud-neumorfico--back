const Todo = require('../models/todo');
const User = require('../models/user');
const { getErrors } = require('../utils/index');

const { ThrowErrorCustom } = require('../utils/errors');

async function create(req, res) {
    try {
        const { id_user: userIdReceived } = req;
        const { description: descriptionReceived } = req.body;

        if (!descriptionReceived) {
            throw new ThrowErrorCustom({
                message: "Passing Todo's description is required",
                status: 400,
            });
        }

        const doesTodoCreated = await Todo.create ({
            id_user: userIdReceived,
            description: descriptionReceived,
        })

        return res.json({doesTodoCreated});
    } catch (errors) {
        getErrors(res, errors);
    }
}

async function read(req, res) {
    try {
        const { id_user: userIdReceived } = req;

        const doesTodosFound = await Todo.findAll({
            where: {
                id_user: userIdReceived,
            }
        });

        if (!doesTodosFound || doesTodosFound.length == 0) {
            throw new ThrowErrorCustom({
                message: "Any Todo were found",
                status: 404,
            });
        }

        return res.json({doesTodosFound});

    } catch (errors) {
        getErrors(res, errors);
    }
}

async function update(req, res) {
    try {
        const { id_user: userIdReceived } = req;
        const {
            id_todo: todoIdReceived,
            description: descriptionReceived
        } = req.body;

        if (!todoIdReceived) {
            throw new ThrowErrorCustom({
                message: "Passing Todo's id is required",
                status: 400,
            });
        }

        if (!descriptionReceived) {
            throw new ThrowErrorCustom({
                message: "Passing Todo's description is required",
                status: 400,
            });
        }

        const getTodo = await Todo.findByPk(todoIdReceived);

        if (!getTodo) {
            throw new ThrowErrorCustom({
                message: "Todo doesn't exist",
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

        return res.send({message: "Todo has been updated successfully"}).json({doesTodoUpdated})
    } catch (errors) {
        getErrors(res, errors);
    }
}

async function destroy(req, res) {
    try {
        const { id_user: userIdReceived } = req;
        const { id_todo: todoIdReceived } = req.body;

        const getTodo = await Todo.findByPk(todoIdReceived);

        if (!getTodo) {
            throw new ThrowErrorCustom({
                message: "Todo doesn't exist",
                status: 400,
            });
        }

        const doesTodoDestroyed = await Todo.destroy(
            {
                where: {
                    id_user: userIdReceived,
                    id_todo: todoIdReceived
                }
            }
        )

        return res.send({message: "Todo has been deleted successfully"}).json({doesTodoDestroyed})
    } catch (errors) {
        getErrors(res, errors);
    }
}

module.exports = {
    create,
    read,
    update,
    destroy
}