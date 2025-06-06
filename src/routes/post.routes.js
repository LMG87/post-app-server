const router = require("express").Router();
const upload = require('../middlewares/upload');
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');
const controller = require("../controllers/post.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del post
 *         title:
 *           type: string
 *           description: Título del post
 *         content:
 *           type: string
 *           description: Contenido del post
 *         image:
 *           type: string
 *           description: Nombre del archivo de imagen
 *         author_id:
 *           type: string
 *           format: uuid
 *           description: ID del autor del post
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Obtiene la lista de posts
 *     tags: [Posts]
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
 *         description: Lista de posts
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
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 *   post:
 *     summary: Crea un nuevo post
 *     tags: [Posts]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post creado exitosamente
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Obtiene un post por ID
 *     tags: [Posts]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *   put:
 *     summary: Actualiza un post
 *     tags: [Posts]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post actualizado exitosamente
 *   delete:
 *     summary: Elimina un post
 *     tags: [Posts]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Post eliminado exitosamente
 */

/**
 * @swagger
 * /api/posts/image/{id}:
 *   get:
 *     summary: Obtiene la imagen de un post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Imagen del post
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *   put:
 *     summary: Actualiza la imagen de un post
 *     tags: [Posts]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del post
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen actualizada exitosamente
 */

router.get("/", apiKeyMiddleware, controller.getAll);
router.get("/:id", apiKeyMiddleware, controller.getById);
router.post("/", protectedRoute(), controller.created);
router.put("/:id", protectedRoute(), controller.updated);
router.delete("/:id", protectedRoute(), controller.deleted);
router.get('/image/:id', controller.getImage);
router.put('/image/:id', [protectedRoute(), upload.single('post')], controller.updatedImage);

module.exports = router;