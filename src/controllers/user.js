const User = require('../models/user');
const { ThrowErrorCustom } = require('../utils/errors');
const { getErrors } = require('../utils/index');

async function create(req, res) {
    try {
        const { name: nameReceived, email: emailReceived, password: passwordReceived } = req.body;

        if (!nameReceived) {
            throw new ThrowErrorCustom({
                message: "Passing Name's value is required",
                status: 400,
            });
        }

        if (!emailReceived) {
            throw new ThrowErrorCustom({
                message: "Passing Email's value is required",
                status: 400,
            });
        }

        if (!passwordReceived) {
            throw new ThrowErrorCustom({
                message: "Passing Password's value is required",
                status: 400,
            });
        }

        const doesUserCreated = await User.create({
            name: nameReceived,
            email: emailReceived,
            password: passwordReceived
        })

        return res.json({doesUserCreated});
    } catch (errors) {
        getErrors(res, errors);
    }
}

async function read(req, res) {
    try {
        const { id_user: userIdReceived } = req;

        const getUser = await User.findByPk(userIdReceived);

        return res.json({getUser});
    } catch (errors) {
        getErrors(res, errors);
    }
}

async function update(req, res) {
    try {
        const { id_user: userIdReceived } = req;
        const {
            name: nameReceived,
            email: emailReceived,
            password: passwordReceived
        } = req.body;

        const getUser = await User.findByPk(userIdReceived);

        if (!getUser) {
            throw new ThrowErrorCustom({
                message: "User doesn't exist",
                status: 400,
            });
        }

        if (nameReceived == undefined && emailReceived == undefined && passwordReceived == undefined) {
            throw new ThrowErrorCustom({
                message: "Nothing to update",
                status: 400,
            });
        }

        const doesUserUpdated = await User.update({
                name: nameReceived,
                email: emailReceived,
                password: passwordReceived
            },
            {
                where: {
                    id_user: userIdReceived,
                }
            }
        )

        return res.send({message: "User has been updated successfully"}).json({doesUserUpdated})
    } catch (errors) {
        getErrors(res, errors);
    }
}

async function destroy(req, res) {
    try {
        const {
            id_user: userIdReceived,
         } = req;

        const getUser = await User.findByPk(userIdReceived);

        if (!getUser) {
            throw new ThrowErrorCustom({
                message: "User doesn't exist",
                status: 400,
            });
        }

        const doesUserDestroyed = await User.destroy(
            {
                where: {
                    id_user: userIdReceived,
                }
            }
        )

        return res.send({message: "User has been deleted successfully"}).json({doesUserDestroyed})
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