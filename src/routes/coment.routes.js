const router = require("express").Router();
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');

const controller = require("../controllers/comment.controller");


router.get("/", apiKeyMiddleware, controller.getAll);
router.get("/:id", apiKeyMiddleware, controller.getById);
router.get("/post/:post", apiKeyMiddleware, controller.getByPost);
router.post("/", protectedRoute(), controller.created);
router.put("/:id", protectedRoute(), controller.updated);
router.delete("/:id", protectedRoute(), controller.deleted);

module.exports = router;