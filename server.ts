import Koa from 'koa';
import socketIO from 'socket.io';
import initDB from './src/db/init';
import { logger } from './src/config/winston';
import { loggerMiddleWare } from './src/middlewares/logger';
import { clearOldLogs } from './src/helpers/clear-old-logs';

const app = new Koa();
const io = socketIO(app);
const port = process.env.PORT || 5001;

clearOldLogs();

(async function startService() {
    try {
        await initDB();

        app.use(loggerMiddleWare);
        app.listen(port);

        logger.info(`Socket service started on port ${port}`);
    } catch {
        logger.info('Shutting down...');
    }
})();
