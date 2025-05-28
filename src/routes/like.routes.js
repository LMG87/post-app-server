const router = require("express").Router();
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');
const controller = require("../controllers/like.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - post_id
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del like
 *         post_id:
 *           type: string
 *           format: uuid
 *           description: ID del post al que pertenece el like
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que dio like
 */

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Toggle like/unlike en un post
 *     tags: [Likes]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - user_id
 *             properties:
 *               post_id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Like/unlike realizado exitosamente
 */

/**
 * @swagger
 * /api/likes/post/{post}:
 *   get:
 *     summary: Obtiene los likes de un post
 *     tags: [Likes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: post
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Lista de likes del post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Like'
 */

router.get("/post/:post", apiKeyMiddleware, controller.getByPost);
router.post("/", protectedRoute(), controller.toggle);

module.exports = router;