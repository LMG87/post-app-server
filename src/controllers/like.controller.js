const { successResponse } = require("../utils/response");
const likeService = require("../services/like.service");
const mainQueue = require("../queues/main.queue");

const toggle = async (req, res, next) => {
    try {
        const job = await mainQueue.add({
            entity: "like",
            type: "toggle",
            data: { id: req.params.id, ...req.body },
        });

        const like = await job.finished();
        return successResponse(res, like, "Like toggle en cola.", 200);
    } catch (error) {
        next(error)
    }
};

const getByPost = async (req, res, next) => {
    try {
        const like = await likeService.getByPost(req.params.post);
        return successResponse(res, like, "Consulta exitosa.", 200);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    toggle,
    getByPost,
}