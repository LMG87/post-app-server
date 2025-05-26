const router = require("express").Router();
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');

const controller = require("../controllers/like.controller");


router.get("/post/:post", apiKeyMiddleware, controller.getByPost);
router.post("/", protectedRoute(), controller.toggle);

module.exports = router;