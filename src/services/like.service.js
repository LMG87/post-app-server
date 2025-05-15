const Like = require('../models/like.model');
const User = require('../models/user.model');
const { throwIfNotFound } = require('../utils/db');

const created = async (data) => {
    await Like.sync();
    const like = await Like.create(data);
    return like;
};
const updated = async (id, data) => {
    const like = await Like.update(data, { where: { id } });
    return like;
}
const getAll = async () => {
    const like = await Like.findAll();
    if (!like) {
        const error = new Error("Registros no encontrados.");
        error.status = 404;
        throw error;
    }
    return throwIfNotFound(like);
};
const getById = async (id) => {
    const like = await Like.findOne({ where: { id } });
    return throwIfNotFound(like);
};
const getByPost = async (post) => {
    const { count, rows } = await Like.findAndCountAll({
        where: { post_id: post },
        include: {
            model: User, as: "Author",
            attributes: {
                exclude: ['role_id', 'createdAt', 'updatedAt']
            }
        }
        , order: [['createdAt', 'DESC']]
    });
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) {
        throw error(`Page ${page} exceeds total pages (${totalPages})`, 404);
    }
    const likes = {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        likes: rows,
    };
    return throwIfNotFound(likes);
};
const deleted = async (id) => {
    return await Like.destroy({ where: { id } });
};

module.exports = {
    created,
    updated,
    getAll,
    getById,
    getByPost,
    deleted
};