const { successResponse, errorResponse } = require("../utils/response");
const authService = require("../services/auth.service");

const login = async (req, res, next) => {
    try {
        const resp = await authService.login(req.body);
        return successResponse(res, resp, "peticion exitosa.", 201);
    } catch (error) {
        next(error);
    }
}

const checkStatus = async (req, res, next) => {
    try {
        const resp = await authService.checkStatus(req.user, req.token);
        return successResponse(res, resp, "peticion exitosa.", 201);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const resp = await authService.authService(req.body);
        return successResponse(res, resp, "creado exitosamente.", 201);
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const resp = await authService.changePassword(req.params.id, req.body);
        return successResponse(res, resp, "actualizado exitosamente.", 200);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    login,
    changePassword,
    checkStatus
};