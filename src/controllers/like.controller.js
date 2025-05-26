const { successResponse } = require("../utils/response");
const likeService = require("../services/like.service");


const toggle = async (req, res, next) => {
    try {
        const like = await likeService.toggle(req.params.id, req.body)
        return successResponse(res, like, "actualizado exitosamente.", 200);
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