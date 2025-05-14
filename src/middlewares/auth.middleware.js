const auth = require("../auth");

function authMiddleware(requiredRole = "user") {
    return (req, res, next) => {
        const id = req.params.id;
        auth.checkToken.confirmToken(req, id, requiredRole);
        next();
    }
}

module.exports = authMiddleware;