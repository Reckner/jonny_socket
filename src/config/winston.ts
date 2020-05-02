import appRoot from 'app-root-path';
import winston from 'winston';
import moment from 'moment';

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'error',
        filename: `${appRoot}/logs/${moment().format(
            'MM_DD_YYYY-HH_mm_ss',
        )}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        options: { flags: 'w' },
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    transports: [new winston.transports.File(options.file)],
    exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console(options.console));
}

export { logger };
