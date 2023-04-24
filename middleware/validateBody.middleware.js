const { requirementsNotNull } = require('@Util/validate');
const { generateErrorResponse } = require('@Util/errors');

const requiredDataMap = {
    "/signup" : ["email", "username", "password"],
    "/signin" : ["username", "password"],
    "/signup/validate": ["email", "token"]
};

const prepareRequiredData = (path) => {
    return requiredDataMap[path];
};

const validateBody = (req, res, next) => {
    const { originalUrl: path } = req;
    const requiredData = prepareRequiredData(path);

    if (!requiredData)
        throw new ReferenceError(`Fatal: This path: ${path} does not have a required data specification!`);

    if(!requirementsNotNull(req.body, ...requiredData)){
        return generateErrorResponse(res, 400);
    }

    return next();
}

module.exports = {
    validateBody
};
