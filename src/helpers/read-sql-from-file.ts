import fs from 'fs';
import path from 'path';

export default function readSqlFromFile(url: string) {
    url = path.join(path.resolve(__dirname), url);

    const file = fs.readFileSync(url);

    return file.toString();
}
