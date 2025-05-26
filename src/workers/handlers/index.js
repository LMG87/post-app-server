const authService = require("../../services/auth.service");
const userService = require("../../services/user.service");
const roleService = require("../../services/role.service");
const postService = require("../../services/post.service");
const commentService = require("../../services/comment.service");
const likeService = require("../../services/like.service");

const handlers = {
    auth: {
        register: (data) => authService.created(data),
        login: (data) => authService.login(data),
    },
    user: {
        create: (data) => userService.created(data),
        update: (data) => userService.updated(data.id, data),
        delete: (data) => userService.deleted(data.id),
    },
    role: {
        create: (data) => roleService.created(data),
        update: (data) => roleService.updated(data.id, data),
        delete: (data) => roleService.deleted(data.id),
    },
    post: {
        create: (data) => postService.created(data),
        update: (data) => postService.updated(data.id, data),
        delete: (data) => postService.deleted(data.id),
    },
    comment: {
        create: (data) => commentService.created(data),
        delete: (data) => commentService.deleted(data.id),
    },
    like: {
        toggle: (data) => likeService.toggle(data),
    },
};

module.exports = handlers;