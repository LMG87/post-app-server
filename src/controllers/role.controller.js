const { successResponse, errorResponse } = require("../utils/response");
const roleService = require("../services/role.service");

const created = async (req, res, next) => {
    try {
        const role = await roleService.created(req.body);
        return successResponse(res, role, "creado exitosamente.", 201);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

const updated = async (req, res, next) => {
    try {
        const role = await roleService.updated(req.params.id, req.body)
        return successResponse(res, role, "actualizado exitosamente.", 200);
    } catch (error) {
        next(error)
    }
};

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || undefined;
        const limit = parseInt(req.query.limit) || undefined;
        const roles = await roleService.getAll(page, limit);
        return successResponse(res, roles, "Consulta exitosa.", 200);

    } catch (error) {
        console.error(error);
        next(error)
    }
};

const getById = async (req, res, next) => {
    try {
        const role = await roleService.getById(req.params.id);
        if (!role) return errorResponse(res, role, "Registro no encontrado.", 404);
        return successResponse(res, role, "Consulta exitosa.", 200);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

const deleted = async (req, res, next) => {
    try {
        await roleService.deleted(req.params.id);
        return successResponse(res, req.params.id, "eliminado correctamente.", 200);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted
}