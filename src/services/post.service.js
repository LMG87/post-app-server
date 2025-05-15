const Post = require('../models/post.model');
const User = require('../models/user.model');
const { throwIfNotFound } = require('../utils/db');
const path = require("path");
const fs = require("fs");

const created = async (data) => {
    await Post.sync();
    const post = await Post.create(data);
    return post;
};
const updated = async (id, data) => {
    const post = await Post.update(data, { where: { id } });
    return post;
}
const getAll = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Post.findAndCountAll({
        limit,
        offset,
        include: {
            model: User,
            as: "Author",
            attributes: {
                exclude: ['role_id', 'createdAt', 'updatedAt'],
            }
        },
        attributes: {
            exclude: ['author_id']
        },
        order: [['createdAt', 'DESC']]
    });
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) {
        throw error(`Page ${page} exceeds total pages (${totalPages})`, 404);
    }
    const posts = {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        posts: rows,
    };

    return throwIfNotFound(posts);
};
const getById = async (id) => {
    const post = await Post.findOne({
        where: { id },
        include: {
            model: User, as: "Author",
            attributes: {
                exclude: ['role_id', 'createdAt', 'updatedAt']
            }
        },
        attributes: { exclude: ['author_id'] }
    });
    return throwIfNotFound(post)
};
const deleted = async (id) => {
    return await Post.destroy({ where: { id } });
};
const getImage = async (id) => {
    const post = await Post.findOne({ where: { id } });
    if (!post.image) {
        return ""
    }

    const postPath = path.join(__dirname, '../..', 'uploads', 'images', 'users', 'post', post.image);

    // Verificar que el archivo exista
    if (!fs.existsSync(postPath)) {
        return ""
    }
    return postPath;
};
const updatedImage = async (id, image) => {
    const post = await Post.findByPk(id);

    if (!post) {
        return;
    }
    // Borrar avatar anterior si existe
    if (post.image) {
        const oldPath = path.join(__dirname, '../..', 'uploads', 'images', 'users', 'avatar', post.image);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath); // Elimina el archivo anterior
        }
    }
    post.image = image;
    return await post.save();
}
module.exports = {
    created,
    updated,
    getAll,
    getById,
    deleted,
    getImage,
    updatedImage
};
