const { successResponse, errorResponse } = require("../utils/response");
const commentService = require("../services/comment.service");

const created = async (req, res, next) => {
    try {
        const comment = await commentService.created(req.body);
        return successResponse(res, comment, "creado exitosamente.", 201);
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
        const comments = await commentService.getAll();
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
        const comment = await commentService.getByPost(req.params.post);
        return successResponse(res, comment, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const deleted = async (req, res, next) => {
    try {
        await commentService.deleted(req.params.id);
        return successResponse(res, req.params.id, "eliminado correctamente.", 200);
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