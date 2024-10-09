import pkg from 'winston';
const { createLogger, error, format, transports } = pkg;

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.printf(({level, message}) => {
            return `[${level}], ${message}`;
        }
    )),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error'}),
    ],
});