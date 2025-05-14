const router = require("express").Router();
const upload = require('../middlewares/upload');
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');

const controller = require("../controllers/post.controller");


router.get("/", apiKeyMiddleware, controller.getAll);
router.get("/:id", apiKeyMiddleware, controller.getById);
router.post("/", protectedRoute(), controller.created);
router.put("/:id", protectedRoute(), controller.updated);
router.delete("/:id", protectedRoute(), controller.deleted);
router.get('/image/:id', controller.getImage);
router.post('/image/:id', [protectedRoute(), upload.single('post')], controller.updatedImage);

module.exports = router;