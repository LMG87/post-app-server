const { successResponse, errorResponse } = require("../utils/response");
const postService = require("../services/post.service");
const mainQueue = require("../queues/main.queue");

const created = async (req, res, next) => {
    try {
        const job = await mainQueue.add({
            entity: "post",
            type: "create",
            data: req.body,
        });

        const post = await job.finished();
        return successResponse(res, post, "Creación de post en cola.", 200);
    } catch (error) {
        next(error)
    }
};

const updated = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await mainQueue.add({
            entity: "post",
            type: "update",
            data: { id, ...req.body },
        });

        const post = await job.finished();
        return successResponse(res, post, "Actualización de post en cola", 200);
    } catch (error) {
        next(error)
    }
};

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || undefined;
        const limit = parseInt(req.query.limit) || undefined;
        const author_id = req.query.author_id || undefined;
        const posts = await postService.getAll(page, limit, author_id);
        return successResponse(res, posts, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const getById = async (req, res, next) => {
    try {
        const post = await postService.getById(req.params.id);
        if (!post) return errorResponse(res, post, "Registro no encontrado.", 404);
        return successResponse(res, post, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const deleted = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await mainQueue.add({
            entity: "post",
            type: "delete",
            data: { id },
        });

        return successResponse(res, id, "Eliminación de post en cola", 200);
    } catch (error) {
        next(error)
    }
};

const getImage = async (req, res, next) => {
    try {
        const imagePath = await postService.getImage(req.params.id);
        if (imagePath === "") {
            errorResponse(res, error, "imagen no encontrada.", 404);
        }
        return res.sendFile(imagePath);
    } catch (error) {
        next(error)
    }
};

const updatedImage = async (req, res, next) => {
    try {
        const post = await postService.updatedImage(req.params.id, req.file ? req.file.filename : null);
        return successResponse(res, post, "actualizado correctamente.", 200);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getImage,
    updatedImage
}