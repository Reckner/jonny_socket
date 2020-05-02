import sql from '../lib/mysql';
import models from '../models';
import readSqlFromFile from '../helpers/read-sql-from-file';
import { logger } from '../config/winston';

const initDB = async () => {
    const modelsCount = Object.keys(models).length;

    const tableCount = await sql
        .queryAsync(
            `SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'db'`,
        )
        .then((res) => Object.values(res[0])[0])
        .catch((err) => {
            logger.error(err);
            throw err;
        });

    if (modelsCount !== tableCount) {
        const query = readSqlFromFile('../sql/user_socket.sql');

        await sql.queryAsync(query).catch((err) => {
            logger.error(err);
            throw err;
        });

        logger.info('Database has been initialized from Scratch!');
    } else {
        logger.info('Database is up to date!');
    }
};

export default initDB;
