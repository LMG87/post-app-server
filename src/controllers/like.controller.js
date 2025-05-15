const { successResponse, errorResponse } = require("../utils/response");
const likeService = require("../services/like.service");

const created = async (req, res, next) => {
    try {
        const like = await likeService.created(req.body);
        return successResponse(res, like, "creado exitosamente.", 201);
    } catch (error) {
        next(error)
    }
};

const updated = async (req, res, next) => {
    try {
        const like = await likeService.updated(req.params.id, req.body)
        return successResponse(res, like, "actualizado exitosamente.", 200);
    } catch (error) {
        next(error)
    }
};

const getAll = async (req, res, next) => {
    try {
        const likes = await likeService.getAll();
        return successResponse(res, likes, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const getById = async (req, res, next) => {
    try {
        const like = await likeService.getById(req.params.id);
        return successResponse(res, like, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const getByPost = async (req, res, next) => {
    try {
        const like = await likeService.getByPost(req.params.post);
        return successResponse(res, like, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

const deleted = async (req, res, next) => {
    try {
        await likeService.deleted(req.params.id);
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