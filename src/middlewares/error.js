//error de validacion de token
const error = (message, code) => {
    let e = new Error(message);

    if (code) {
        e.message = message;
        e.statusCode = code;
    }
    return e;
}

module.exports = error;