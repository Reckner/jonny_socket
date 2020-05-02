import fs from 'fs';
import appRoot from 'app-root-path';
import { logger } from '../config/winston';

export function clearOldLogs() {
    const files = fs.readdirSync(`${appRoot}/logs`);

    for (const filename of files) {
        const file = fs.readFileSync(`${appRoot}/logs/${filename}`);
        if (file.length === 0) {
            try {
                fs.unlinkSync(`${appRoot}/logs/${filename}`);
            } catch (err) {
                logger.warn(err);
            }
        }
    }
}
