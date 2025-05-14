const { successResponse, errorResponse } = require("../utils/response");
const postService = require("../services/post.service");

const created = async (req, res, next) => {
    try {
        const post = await postService.created(req.body);
        return successResponse(res, post, "creado exitosamente.", 201);
    } catch (error) {
        next(error)
    }
};

const updated = async (req, res, next) => {
    try {
        const post = await postService.updated(req.params.id, req.body)
        return successResponse(res, post, "actualizado exitosamente.", 200);
    } catch (error) {
        next(error)
    }
};

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const posts = await postService.getAll(page, limit);
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
        await postService.deleted(req.params.id);
        return successResponse(res, req.params.id, "eliminado correctamente.", 200);
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
}

module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getImage,
    updatedImage
}