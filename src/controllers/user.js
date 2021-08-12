const User = require('../models/user');
const { ThrowErrorCustom } = require('../utils/errors');

async function create(req, res) {
    try {
        const { name: nameReceived, email: emailReceived, password: passwordReceived } = req.body;

        if (!nameReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the name",
                status: 400,
            });
        }
        if (!emailReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the email",
                status: 400,
            });
        }
        if (!passwordReceived) {
            throw new ThrowErrorCustom({
                message: "You must pass the password",
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
            console.log(`Message:, ${errors.message}`)
            console.log(`Status:, ${errors.status}`)
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
    create
}