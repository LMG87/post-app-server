const handlers = require("./handlers");

module.exports = async (job) => {
    const { entity, type, data } = job.data;

    if (!handlers[entity]) {
        throw new Error(`Entidad "${entity}" no soportada`);
    }

    if (!handlers[entity][type]) {
        throw new Error(`Tipo de trabajo "${type}" no soportado para la entidad "${entity}"`);
    }

    return await handlers[entity][type](data);
};