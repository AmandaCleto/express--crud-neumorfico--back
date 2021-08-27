const User = require('../models/user');
const { ThrowErrorCustom } = require('../utils/errors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const process = require('process');

async function authenticate(req, res) {
    try {
        const { email: emailReceived, password: passwordReceived } = req.body;

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

        const doesUserExist = await User.scope('withPassword').findOne({
            where: {
                email: emailReceived
            }
        });

        if (!doesUserExist) {
            throw new ThrowErrorCustom({
                message: "User doesn't exist",
                status: 404,
            });
        }

        const doesPasswordValid = bcrypt.compareSync(passwordReceived, doesUserExist.password);

        if (!doesPasswordValid) {
            throw new ThrowErrorCustom({
                message: "Password is invalid",
                status: 404,
            });
        }

        const tokenJwt = jwt.sign(
            { id_user: doesUserExist.id_user }, // payload = data
            process.env.JWT_SECRET, // secret key
            { algorithm: 'HS256', expiresIn: '12h' } // configs with iat
        );

        return res.json({token: tokenJwt});
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

module.exports = { authenticate }