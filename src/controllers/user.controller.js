const { successResponse, errorResponse } = require("../utils/response");
const userService = require("../services/user.service");
const mainQueue = require("../queues/main.queue");

const created = async (req, res, next) => {
  try {
    const job = await mainQueue.add({
      entity: "user",
      type: "create",
      data: req.body,
    });

    const user = await job.finished();
    return successResponse(res, user, "Creación de usuario en cola.", 200);
  } catch (error) {
    console.error(error);
    next(error)
  }
};

const updated = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await mainQueue.add({
      entity: "user",
      type: "update",
      data: { id, ...req.body },
    });

    const user = await job.finished();
    return successResponse(res, user, "Actualización de usuario en cola", 200);
  } catch (error) {
    next(error)
  }
};

const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || undefined;
    const limit = parseInt(req.query.limit) || undefined;

    const users = await userService.getAll(page, limit);
    return successResponse(res, users, "Consulta exitosa.", 200);

  } catch (error) {
    next(error)
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return errorResponse(res, user, "Registro no encontrado.", 404);
    return successResponse(res, user, "Consulta exitosa.", 200);
  } catch (error) {
    console.error(error);
    next(error)
  }
};

const deleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await mainQueue.add({
      entity: "user",
      type: "delete",
      data: { id },
    });

    return successResponse(res, id, "Eliminación de usuario en cola", 200);
  } catch (error) {
    console.error(error);
    next(error)
  }
};

const getAvatar = async (req, res, next) => {
  try {
    const avatarPath = await userService.getAvatar(req.params.id);
    if (avatarPath === "") {
      errorResponse(res, avatarPath, "imagen no encontrado.", 404);
    }
    return res.sendFile(avatarPath);
  } catch (error) {
    next(error)
  }
};

const updatedAvatar = async (req, res, next) => {
  try {
    const user = await userService.updatedAvatar(req.params.id, req.file ? req.file.filename : null);
    return successResponse(res, user, "actualizado correctamente.", 200);
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
  getAvatar,
  updatedAvatar
}