const throwIfNotFound = (data, message = "Registros no encontrados.") => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
        const error = new Error(message);
        error.status = 404;
        throw error;
    }
    return data;
};

module.exports = {
    throwIfNotFound
};