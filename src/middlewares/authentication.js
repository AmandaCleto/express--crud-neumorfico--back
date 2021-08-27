const jwt = require('jsonwebtoken');
const process = require('process');

function authMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;

        const tokenParts = String(authorization).split(' ');

        //Bearer 289r4e3tf463g
        //[0]Bearer
        //[1]289r4e3tf463g

        if(tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
            throw new ThrowErrorCustom({
                message: "Passing Bearer's token is required",
                status: 401,
            });
        }

        const jwtPayload = jwt.verify(tokenParts[1], process.env.JWT_SECRET);

        if(!jwtPayload.userId) {
            throw new ThrowErrorCustom({
                message: "Token invalid",
                status: 401,
            });
        }

        req.userId = jwtPayload.userId;

        return next();
    }  catch (errors) {
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
    authMiddleware
};