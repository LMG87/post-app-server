const router = require("express").Router();
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');
const controller = require("../controllers/comment.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - post_id
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del comentario
 *         content:
 *           type: string
 *           description: Contenido del comentario
 *         post_id:
 *           type: string
 *           format: uuid
 *           description: ID del post al que pertenece el comentario
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que hizo el comentario
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Obtiene la lista de comentarios
 *     tags: [Comments]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de registros por página
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Comment'
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [Comments]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comentario creado exitosamente
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Obtiene un comentario por ID
 *     tags: [Comments]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *   delete:
 *     summary: Elimina un comentario
 *     tags: [Comments]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 */

/**
 * @swagger
 * /api/comments/post/{post}:
 *   get:
 *     summary: Obtiene los comentarios de un post
 *     tags: [Comments]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: post
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de registros por página
 *     responses:
 *       200:
 *         description: Lista de comentarios del post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     comments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Comment'
 */

router.get("/", apiKeyMiddleware, controller.getAll);
router.get("/:id", apiKeyMiddleware, controller.getById);
router.get("/post/:post", apiKeyMiddleware, controller.getByPost);
router.post("/", protectedRoute(), controller.created);
router.delete("/:id", protectedRoute(), controller.deleted);

module.exports = router; 