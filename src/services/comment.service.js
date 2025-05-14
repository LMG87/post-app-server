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
const getAll = async () => {
    const comments = await Comment.findAll();
    return throwIfNotFound(comments);
};
const getById = async (id) => {
    const comment = await Comment.findOne({ where: { id } });
    return throwIfNotFound(comment);
};
const getByPost = async (post) => {
    const comment = await Comment.findOne({
        where: { post_id: post },
        include: {
            model: User, as: "Author",
            attributes: {
                exclude: ['role_id', 'createdAt', 'updatedAt']
            }
        }
    });
    return throwIfNotFound(comment);
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