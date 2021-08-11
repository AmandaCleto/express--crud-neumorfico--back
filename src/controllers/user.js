const User = require('../models/user');

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
        console.log(doesUserCreated)
        return res.json({doesUserCreated});

    } catch (error) {
        console.log(error)
        return res.status(error.status).send({ message: error.message });
    }
}

module.exports = {
    create
}