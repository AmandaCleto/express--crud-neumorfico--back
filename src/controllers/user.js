const User = require('../models/user');
const { ThrowErrorCustom } = require('../utils/errors');

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
        const { id_user: userIdReceived } = req;

        const getUser = await User.findByPk(userIdReceived);

        return res.json({getUser});
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
    update,
    destroy
}