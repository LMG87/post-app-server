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
const getAll = async (page, limit) => {
    let options = {
        order: [['createdAt', 'DESC']]
    };
    if (page && limit) {
        const offset = (page - 1) * limit;
        options.limit = limit;
        options.offset = offset;
    }
    const { count, rows } = await Role.findAndCountAll(options);

    if (!page || !limit) {
        return throwIfNotFound({
            totalItems: count,
            roles: rows
        });
    }
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) {
        throw error(`Page ${page} exceeds total pages (${totalPages})`, 404);
    }
    return throwIfNotFound({
        totalItems: count,
        totalPages,
        currentPage: page,
        roles: rows
    });
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
