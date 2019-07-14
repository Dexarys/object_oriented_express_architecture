const winston = require('winston');

var options = {
    file: {
        level: 'info',
        filename: process.env.LOG_FILE,
        handleExceptions: true,
        json: true,
        colorize: false
    },
    console: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: true
    }
}

const logger = new winston.Logger({
    level: 'info',
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ]
});

module.exports = logger;