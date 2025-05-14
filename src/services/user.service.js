const User = require('../models/user.model');
const Role = require('../models/role.model');
const Auth = require('../models/auth.model');
const error = require("../middlewares/error");
const { throwIfNotFound } = require('../utils/db');
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const created = async (data) => {
    await User.sync();
    const user = await User.create(data);
    let auth = ''
    if (data.password) {
        await Auth.sync();
        password = await bcrypt.hash(data.password.toString(), 5);
        auth = await Auth.create({
            id: user.id,
            email: data.email,
            password: password,
        });
        user.dataValues["auth"] = true;
        console.log({ user });
    } else {
        user.dataValues["auth"] = false;
    }
    return user;
};
const updated = async (id, data) => {
    const user = await User.update(data, { where: { id } });
    await Auth.update({
        email: data.email,
    }, { where: { id } });
    return user;
}
const getAll = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({ limit, offset, include: { model: Role, as: "Role", attributes: { exclude: ['createdAt', 'updatedAt'] } }, attributes: { exclude: ['role_id'] }, order: [['createdAt', 'DESC']] });
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) {
        throw error(`Page ${page} exceeds total pages (${totalPages})`, 404);
    }
    const users = {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        users: rows,
    };

    return throwIfNotFound(users)
};
const getById = async (id) => {
    const user = await User.findOne({
        where: { id },
        include: { model: Role, as: "Role", attributes: { exclude: ['createdAt', 'updatedAt'] } },
        attributes: { exclude: ['role_id'] }
    });
    return throwIfNotFound(user)
};
const deleted = async (id) => {
    const user = await User.destroy({ where: { id } });
    await Auth.destroy({ where: { id } });
    return user;
};
const getAvatar = async (id) => {
    const user = await User.findOne({ where: { id } });
    if (!user.avatar) {
        return throwIfNotFound(user);
    }

    const avatarPath = path.join(__dirname, '../..', 'uploads', 'images', 'users', 'avatar', user.avatar);

    // Verificar que el archivo exista
    if (!fs.existsSync(avatarPath)) {
        return ""
    }
    return avatarPath;
};

const updatedAvatar = async (id, avatar) => {
    const user = await User.findByPk(id);

    if (!user) {
        return throwIfNotFound(user);
    }
    // Borrar avatar anterior si existe
    if (user.avatar && user.avatar != 'avatar-user.png') {
        const oldPath = path.join(__dirname, '../..', 'uploads', 'images', 'users', 'avatar', user.avatar);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath); // Elimina el archivo anterior
        }
    }
    user.avatar = avatar;
    return await user.save();
}

module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getAvatar,
    updatedAvatar
};
