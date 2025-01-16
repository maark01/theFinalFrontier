"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureSqlStore = exports.SqlStore = void 0;
class SqlStore {
    db;
    constructor(db) {
        this.db = db;
    }
    shouldAbort(error) {
        if (error) {
            console.error('Error in tx', error.stack);
            return true;
        }
        return false;
    }
    abort(client, done) {
        client.query('ROLLBACK', (error) => {
            if (error) {
                console.error('Error rolling back client', error.stack);
            }
            done();
        });
    }
    abortIfNeeded(error, client, done, reject) {
        if (this.shouldAbort(error)) {
            console.log('aborted', error);
            this.abort(client, done);
            reject(error ?? undefined);
            return true;
        }
        return false;
    }
    doCommit(client, done, resolve, result) {
        client.query('COMMIT', (error) => {
            if (error) {
                console.error('Error committing transaction', error.stack);
            }
            done();
            resolve(result);
        });
    }
    execute(sql, params) {
        return this.db.query(sql, params).catch((e) => {
            console.log(sql, params, e);
            throw e;
        });
    }
    query(sql, params, parse) {
        return this.db
            .query(sql, params)
            .then((result) => result.rows.map((row) => parse(row)))
            .catch((e) => {
            console.log(sql, params, e);
            throw e;
        });
    }
    queryFirst(sql, params, parse) {
        return this.db
            .query(sql, params)
            .then((result) => {
            if (result.rowCount === 0) {
                return undefined;
            }
            const row = result.rows[0];
            return parse(row);
        })
            .catch((e) => {
            console.log(sql, params, e);
            throw e;
        });
    }
    queryFirstColumn(sql, column, params) {
        return this.db
            .query(sql, params)
            .then((result) => {
            if (result.rowCount === 0) {
                return undefined;
            }
            const row = result.rows[0];
            return row[column] ?? undefined;
        })
            .catch((e) => {
            console.log(sql, params, e);
            throw e;
        });
    }
    queryColumn(sql, column, params) {
        return this.db
            .query(sql, params)
            .then((result) => result.rows.map((row) => row[column] ?? undefined).filter((row) => row !== undefined))
            .catch((e) => {
            console.log(sql, params, e);
            throw e;
        });
    }
    hasResult(sql, params) {
        return this.db
            .query(sql, params)
            .then((result) => 0 < (result.rowCount ?? 0))
            .catch((e) => {
            console.log(sql, params, e);
            throw e;
        });
    }
    inTx = (body) => {
        return new Promise((resolve, reject) => {
            this.db.connect((error, client, done) => {
                if (client === undefined) {
                    reject(error);
                    return;
                }
                if (this.abortIfNeeded(error ?? null, client, done, reject))
                    return;
                client.query('BEGIN', (error) => {
                    if (this.abortIfNeeded(error, client, done, reject))
                        return;
                    body(client, (error) => {
                        return this.abortIfNeeded(error, client, done, reject);
                    }, (error, result) => {
                        if (this.abortIfNeeded(error, client, done, reject))
                            return;
                        this.doCommit(client, done, resolve, result);
                    });
                });
            });
        });
    };
}
exports.SqlStore = SqlStore;
class SecureSqlStore extends SqlStore {
    encryptionKey;
    constructor(encryptionKey, db) {
        super(db);
        this.encryptionKey = encryptionKey;
    }
}
exports.SecureSqlStore = SecureSqlStore;
