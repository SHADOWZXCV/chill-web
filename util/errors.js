const types_messages = {
    "empty-fields": "There are fields that should not be empty!",
    "account-exists": "This account already exists!",
    "unauthenticated": "This user is not authenticated!"
};

const addDetailsToError = (message, data = '') => `${message}${data}`;

const generateErrorResponse = (res, code, type) => {
    const msg = types_messages[type];
    const error = {
        errors: {
            type,
            message: msg ? addDetailsToError(msg) : "Undefined error"
        }
    }

    return res.status(code).send(error);
};

module.exports = {
    generateErrorResponse
}
