const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const { throwIfNotFound } = require('../utils/db');

const created = async (data) => {
    await Comment.sync();
    const comment = await Comment.create(data);
    return comment;
};
const updated = async (id, data) => {
    const comment = await Comment.update(data, { where: { id } });
    return comment;
}
const getAll = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Comment.findAndCountAll({ limit, offset });
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) {
        throw error(`Page ${page} exceeds total pages (${totalPages})`, 404);
    }
    const comments = {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        comments: rows,
    };
    return throwIfNotFound(comments);
};
const getById = async (id) => {
    const comment = await Comment.findOne({ where: { id } });
    return throwIfNotFound(comment);
};
const getByPost = async (post, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Comment.findAndCountAll({
        limit,
        offset,
        where: { post_id: post },
        include: {
            model: User, as: "Author",
            attributes: {
                exclude: ['role_id', 'createdAt', 'updatedAt']
            }
        }
    });
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) {
        throw error(`Page ${page} exceeds total pages (${totalPages})`, 404);
    }
    const comments = {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        comments: rows,
    };
    return throwIfNotFound(comments);
};
const deleted = async (id) => {
    return await Comment.destroy({ where: { id } });
};
module.exports = {
    created,
    updated,
    getAll,
    getById,
    getByPost,
    deleted
};