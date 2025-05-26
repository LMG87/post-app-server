const { successResponse, errorResponse } = require("../utils/response");
const roleService = require("../services/role.service");
const mainQueue = require("../queues/main.queue");


const created = async (req, res, next) => {
    try {
        const { name } = req.body;

        const job = await mainQueue.add({
            entity: "role",
            type: "create",
            data: { name },
        });

        const role = await job.finished();

        return successResponse(res, role, "Creación de role en cola.", 200);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

const updated = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const job = await mainQueue.add({
            entity: "role",
            type: "update",
            data: { id, name },
        });

        const role = await job.finished();

        return successResponse(res, role, "Actualización de role en cola", 200);
    } catch (error) {
        console.error(error);
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
        const { id } = req.params;

        const job = await mainQueue.add({
            entity: "role",
            type: "delete",
            data: { id },
        });

        return successResponse(res, req.params.id, "eliminado de role en cola", 200);
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