const router = require("express").Router();
const protectedRoute = require("../middlewares/protected.middleware");
const apiKeyMiddleware = require('../middlewares/apiKey.middlewar');
const controller = require("../controllers/role.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del rol
 *         name:
 *           type: string
 *           description: Nombre del rol
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene la lista de roles
 *     tags: [Roles]
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
 *         description: Lista de roles
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
 *                     roles:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Role'
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
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
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtiene un rol por ID
 *     tags: [Roles]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 *   put:
 *     summary: Actualiza un rol
 *     tags: [Roles]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *   delete:
 *     summary: Elimina un rol
 *     tags: [Roles]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 */

router.get("/", apiKeyMiddleware, controller.getAll);
router.get("/:id", apiKeyMiddleware, controller.getById);
router.post("/", protectedRoute("admin"), controller.created);
router.put("/:id", protectedRoute("admin"), controller.updated);
router.delete("/:id", protectedRoute("admin"), controller.deleted);

module.exports = router;