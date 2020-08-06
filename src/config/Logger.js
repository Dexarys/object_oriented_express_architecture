const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

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

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level} : ${message}`;
})

const logger = new createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    level: 'info',
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ]
});

module.exports = logger;