const morgan = require('morgan');
const logger = require('@Util/log');

const stream = {
    write: message => logger.http(message.trim())
};

const skip = () => process.env.NODE_ENV === 'production';

const morganMiddleware = morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);

module.exports = morganMiddleware;
