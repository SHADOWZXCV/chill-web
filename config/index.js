const logger = require("@Util/log");

const corsOptions = {
    origin: process.env.origin,
    credentials: true,
    optionSuccessStatus: 200
};

const checkState = () => {
    if(!process.env.origin){
        logger.error('Cors origin is not specified!');
    }
};

module.exports = {
    corsOptions,
    checkState
};
