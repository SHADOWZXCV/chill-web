const { generateErrorResponse } = require("@Util/errors");

const isSignedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        return generateErrorResponse(res, 403, "unauthenticated");
    }
};

module.exports = isSignedIn;
