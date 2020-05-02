import Koa from 'koa';
import winston from 'winston';
import appRoot from 'app-root-path';
import moment from 'moment';

export function loggerMiddleWare(winstonInstance: any) {
    winstonInstance.configure({
        level: process.env.NODE_ENV !== 'production' ? 'info' : 'debug',
        transports: [
            //
            // - Write all logs error (and below) to `error.log`.
            new winston.transports.File({
                filename: `${appRoot}/logs/${moment().format(
                    'MM_DD_YYYY-HH_mm_ss',
                )}.log`,
                level: 'error',
            }),
            //
            // - Write to all logs with specified level to console.
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                ),
            }),
        ],
    });

    return async (ctx: Koa.Context, next: () => Promise<any>) => {
        const start = new Date().getTime();

        await next();

        const ms = new Date().getTime() - start;

        let logLevel: string;
        if (ctx.status >= 500) {
            logLevel = 'error';
        } else if (ctx.status >= 400) {
            logLevel = 'warn';
        } else {
            logLevel = 'info';
        }

        const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

        winstonInstance.log(logLevel, msg);
    };
}
