import { Pool, QueryResult, PoolClient, QueryResultRow } from 'pg'

export class SqlStore {
    constructor(protected db: Pool) { }

    protected shouldAbort(error: Error | null): boolean {
        if (error) {
            console.error('Error in tx', error.stack)
            return true
        }
        return false
    }

    protected abort(client: PoolClient, done: any) {
        client.query('ROLLBACK', (error: Error) => {
            if (error) {
                console.error('Error rolling back client', error.stack)
            }
            done()
        })
    }

    protected abortIfNeeded(error: Error | null, client: PoolClient, done: any, reject: (reason: Error | undefined) => void): boolean {
        if (this.shouldAbort(error)) {
            console.log('aborted', error)
            this.abort(client, done)
            reject(error ?? undefined)
            return true
        }
        return false
    }

    protected doCommit(client: PoolClient, done: any, resolve: (result: any) => void, result: any) {
        client.query('COMMIT', (error: any) => {
            if (error) {
                console.error('Error committing transaction', error.stack)
            }
            done()
            resolve(result)
        })
    }

    protected execute(sql: string, params?: any[]): Promise<QueryResult> {
        return this.db.query(sql, params).catch((e) => {
            console.log(sql, params, e)
            throw e
        })
    }

    protected query<T, R extends QueryResultRow>(sql: string, params: any[] | undefined, parse: (row: R) => T): Promise<T[]> {
        return this.db
            .query<R, any>(sql, params)
            .then((result: QueryResult<R>) => result.rows.map((row: R) => parse(row)))
            .catch((e) => {
                console.log(sql, params, e)
                throw e
            })
    }

    protected queryFirst<T, R extends QueryResultRow>(sql: string, params: any[] | undefined, parse: (row: R) => T): Promise<T | undefined> {
        return this.db
            .query(sql, params)
            .then((result: QueryResult) => {
                if (result.rowCount === 0) {
                    return undefined
                }
                const row = result.rows[0]
                return parse(row)
            })
            .catch((e) => {
                console.log(sql, params, e)
                throw e
            })
    }

    protected queryFirstColumn<T extends string | boolean>(sql: string, column: string, params: any[] | undefined): Promise<T | undefined> {
        return this.db
            .query(sql, params)
            .then((result: QueryResult) => {
                if (result.rowCount === 0) {
                    return undefined
                }
                const row = result.rows[0]
                return row[column] ?? undefined
            })
            .catch((e) => {
                console.log(sql, params, e)
                throw e
            })
    }

    protected queryColumn<T>(sql: string, column: string, params: any[] | undefined): Promise<T[]> {
        return this.db
            .query(sql, params)
            .then((result: QueryResult) => result.rows.map((row) => row[column] ?? undefined).filter((row) => row !== undefined))
            .catch((e) => {
                console.log(sql, params, e)
                throw e
            })
    }

    protected hasResult(sql: string, params: any[] | undefined): Promise<boolean> {
        return this.db
            .query(sql, params)
            .then((result) => 0 < (result.rowCount ?? 0))
            .catch((e) => {
                console.log(sql, params, e)
                throw e
            })
    }

    protected readonly inTx = <T>(body: (client: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, result: T) => void) => void): Promise<T> => {
        return new Promise<T>((resolve, reject) => {
            this.db.connect((error, client, done: (release?: any) => void) => {
                if (client === undefined) {
                    reject(error)
                    return
                }
                if (this.abortIfNeeded(error ?? null, client, done, reject)) return

                client.query('BEGIN', (error) => {
                    if (this.abortIfNeeded(error, client, done, reject)) return
                    body(
                        client,
                        (error: Error | null) => {
                            return this.abortIfNeeded(error, client, done, reject)
                        },
                        (error: Error | null, result: T) => {
                            if (this.abortIfNeeded(error, client, done, reject)) return
                            this.doCommit(client, done, resolve, result)
                        }
                    )
                })
            })
        })
    }
}

export class SecureSqlStore extends SqlStore {
    constructor(protected encryptionKey: string, db: Pool) {
        super(db)
    }
}