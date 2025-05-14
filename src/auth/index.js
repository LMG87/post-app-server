const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../middlewares/error");

const secret = config.jwt.secret;

function assignToken(data, expiresIn = "1h") {
    return jwt.sign(data, secret, { expiresIn });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw error("Token expired", 401);
        } else if (err.name === "JsonWebTokenError") {
            throw error("Invalid token", 401);
        }
        throw error("Token verification failed", 401);
    }
}

const checkToken = {
    confirmToken: function (req, id, requiredRole) {
        const { id: userId, role: role } = decodeHeader(req);

        const isAdmin = (role === "admin");
        const isOwner = (userId === id);

        if (requiredRole === "admin" && !isOwner && !isAdmin) {
            throw error("You don't have privileges to do this operation", 401);
        }
    }
};

function getToken(authorization) {

    if (!authorization?.startsWith("Bearer ")) {
        throw error("Token missing or malformed", 401);
    }

    return authorization.split(" ")[1];;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || "";
    const token = getToken(authorization);
    const decode = verifyToken(token);

    req.user = decode;
    req.token = token;

    return decode;
}

module.exports = {
    assignToken,
    checkToken,
};