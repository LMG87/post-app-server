// middlewares/protectedMiddleware.js
const apiKeyMiddleware = require("./apiKey.middlewar");
const authMiddleware = require("./auth.middleware");

function protectedRoute(requiredRole = "user") {
    return [
        apiKeyMiddleware,       // Validar la aplicación
        authMiddleware(requiredRole) // Validar al usuario
    ];
}

module.exports = protectedRoute;