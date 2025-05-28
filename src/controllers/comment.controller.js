const { successResponse, errorResponse } = require("../utils/response");
const commentService = require("../services/comment.service");
const mainQueue = require("../queues/main.queue");

const created = async (req, res, next) => {
    try {
        const job = await mainQueue.add({
            entity: "comment",
            type: "create",
            data: req.body,
        });

        const comment = await job.finished();
        return successResponse(res, comment, "Creación de comentario en cola.", 200);
    } catch (error) {
        next(error)
    }
};

const updated = async (req, res, next) => {
    try {
        const comment = await commentService.updated(req.params.id, req.body)
        return successResponse(res, comment, "actualizado exitosamente.", 200);
    } catch (error) {
        next(error)
    }
};

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const comments = await commentService.getAll(page, limit);
        return successResponse(res, comments, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const getById = async (req, res, next) => {
    try {
        const comment = await commentService.getById(req.params.id);
        return successResponse(res, comment, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const getByPost = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const comment = await commentService.getByPost(req.params.post, page, limit);
        return successResponse(res, comment, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const deleted = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await mainQueue.add({
            entity: "comment",
            type: "delete",
            data: { id },
        });

        return successResponse(res, id, "Eliminación de comentario en cola", 200);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    created,
    updated,
    getAll,
    getById,
    getByPost,
    deleted
}