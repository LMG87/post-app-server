const config = require("../config");
const error = require("./error");

function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) return next(error("API Key is missing", 401));
    if (apiKey !== config.apiKey) return next(error("Invalid API Key", 403));
    next();
}

module.exports = apiKeyMiddleware;
