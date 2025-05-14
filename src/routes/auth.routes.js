const express = require("express");
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');

const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", controller.login);
router.post("/", apiKeyMiddleware, controller.create);
router.get("/check-status", protectedRoute(), controller.checkStatus);
router.put("/:id", protectedRoute(), controller.changePassword);

module.exports = router;