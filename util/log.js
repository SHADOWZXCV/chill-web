const winston = require('winston');

const levels = {
    // some one functionality is broken, the whole system is stopped because of it!
    // example: db connection is broken
    fatal: 0,
    // Use this when needing to show steps of an algorithm
    // example: Signing user in!
    error: 1,
    // some one functionality is broken, system can proceed without it!
    // example: route has a problem - a third-party API is not functioning - unhandled exceptions
    debug: 2,
    // logging normal info about the application
    // example: server has started - connected to anything
    info: 3,
    // logging http requests
    http: 4
};

// the level specifies that based on it winston will only log
// anything with less than or equal to the level severity chosen.
const level = () => {
    return process.env.LOG_LEVEL || process.env.NODE_ENV === 'development' ? 'http' : 'error';
};

const colors = {
    fatal: 'red',
    error: 'yellow',
    debug: 'cyan',
    info: 'green',
    http: 'grey'
};

winston.addColors(colors);

const winFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
    // "all" tells the formatter to color both the message and the level!
    winston.format.colorize(),
    winston.format.label({
        label:'[LOGGER]'
    }),
    winston.format.printf(info => `${info.label} ${info.timestamp} [${info.level}]: ${info.message}`),
);

// a.k.a: where the logs would be written.
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),
    new winston.transports.File({
        filename: 'logs/fatal.log',
        level: 'fatal'
    }),
    new winston.transports.File({
        filename: 'logs/debug.log',
        silent: process.env.NODE_ENV === 'production'
    }),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    format: winFormat,
    transports
});

module.exports = logger;
