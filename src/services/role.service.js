const Role = require('../models/role.model');
const { throwIfNotFound } = require('../utils/db');

const created = async (data) => {
    await Role.sync();
    const role = await Role.create(data);
    return role;
};
const updated = async (id, data) => {
    const role = await Role.update(data, { where: { id } });
    return role;
}
const getAll = async () => {
    const roles = await Role.findAll();
    return throwIfNotFound(roles)
};
const getById = async (id) => {
    const role = await Role.findOne({ where: { id } });
    return throwIfNotFound(role)
};
const deleted = async (id) => {
    return await Role.destroy({ where: { id } });
};
module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted
};
