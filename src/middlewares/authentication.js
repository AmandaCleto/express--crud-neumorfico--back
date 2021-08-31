const jwt = require('jsonwebtoken');
const process = require('process');
const { getErrors } = require('../utils/index');

function authenticationMiddleware(req, res, next) {
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

        if(!jwtPayload.id_user) {
            throw new ThrowErrorCustom({
                message: "Token invalid",
                status: 401,
            });
        }

        req.id_user = jwtPayload.id_user;

        return next();
    }  catch (errors) {
        getErrors(res, errors);
    }
}

module.exports = {
    authenticationMiddleware
};