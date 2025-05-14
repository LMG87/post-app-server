const router = require("express").Router();
const upload = require('../middlewares/upload');
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');

const controller = require("../controllers/user.controller");


router.get("/", apiKeyMiddleware, controller.getAll);
router.get("/:id", apiKeyMiddleware, controller.getById);
router.post("/", apiKeyMiddleware, controller.created);
router.patch("/:id", protectedRoute(), controller.updated);
router.delete("/:id", protectedRoute(), controller.deleted);
router.get('/avatar/:id', controller.getAvatar);
router.put('/avatar/:id', [protectedRoute(), upload.single('avatar')], controller.updatedAvatar);

module.exports = router;