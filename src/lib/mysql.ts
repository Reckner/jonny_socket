import mysql from 'mysql';

declare module 'mysql' {
    interface Pool {
        queryAsync: (query: string | mysql.QueryOptions) => Promise<any>;
    }
}

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'host.docker.internal',
    user: 'root',
    password: 'root',
    database: 'db',
    port: parseInt(process.env.MYSQL_PORT || '3308', 10),
});

pool.queryAsync = function (query: string | mysql.QueryOptions) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(query, function (error, results) {
                    if (error) {
                        connection.destroy();
                        reject(error);
                    } else {
                        resolve(results);
                        connection.destroy();
                    }
                });
            }
        });
    });
};

export default pool;
