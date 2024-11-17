import { Pool, QueryResult, PoolClient, QueryResultRow } from 'pg'

export class SqlStore {
    constructor(protected db: Pool) { }

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

    // kell abortálni?
    protected shouldAbort(error: Error | null | undefined): boolean {   // paramétere egy változó, ami vagy Error típusú (és tényleges hiba), vagy null vagy undefined (és nincs hiba)
        if (error === null || error === undefined) {
            return false    // ha null vagy undefined (tehát nincs hiba), akkor false, nem kell abortálni
        }
        console.error('Error in tx', error.stack)   // egyéb esetben, tehát ha hiba van, írd ki a hibát és térj vissza true-val
        return true
    }

    // abortál
    protected abort(client: PoolClient, done: any): void {  // egy kliens és egy bármilyen típusú done
        client.query('ROLLBACK', (error: Error | null) => { // ROLLBACK, és callback függvényben error vagy null (a callback egy függvény a másik függvény paramétereként)
            if (error) {    // ha van hiba
                console.error('Error rolling back client', error?.stack)    // írja ki
            }
            done()  // "elengedjük" a client objektumot, visszatesszük a poolba hogy más tranzakciók használhassák
        })
    }

    // abortál ha kell
    protected abortIfNeeded(error: Error | null | undefined, client: PoolClient, done: any, reject: (reason: Error | undefined) => void): boolean {
        if (this.shouldAbort(error)) {  // ha a shouldAbort true
            console.log('[ABORT]: ', error) // a tranzakciót ABORT 
            this.abort(client, done)    // meghívjuk az abort függvényt, ami ROLLBACK-kel
            reject(error ?? undefined)  // a Promise-t reject-elje
            return true // térjen vissza true-val, hogy igen, valóban abortálni kell
        }
        return false    // egyéb esetben false
    }

    // commit
    protected doCommit(client: PoolClient, done: any, resolve: (result: any) => void, result: any, reject: (reason: Error | undefined) => void): void {
        client.query('COMMIT', (error: any) => {    // COMMIT_teljünk, de ha bármi hiba lenne (pl. hálózati)
            if (this.abortIfNeeded(error, client, done, reject)) {  // akkor nézzük meg h kell-e abortálni, ha igen akkor reject
                return                                              // és térjünk vissza
            }
            done()  // ha nem, akkor done
            resolve(result) // és Promise resolve az eredménnyel
        })
    }

    // SQL transactionnél használjuk
    // void body, paraméterei egy PoolClient, egy check, hogy van-e error, void onDone
    protected inTx = <T>(body: (client: PoolClient, check: (error: Error | null) => boolean, onDone: (result: T) => void) => void): Promise<T> => {
        return new Promise((resolve, reject) => {

            // csatlakozik az adatbázishoz, paraméterei Error(ha van), poolClient, done
            this.db.connect((error: Error | null | undefined, client: PoolClient | undefined, done: (release?: any) => void) => {
                if (client === undefined) { // ha nincs kliens
                    reject(error)   // akkor rögtön reject ágra megy és nem fut tovább a metódus
                    return          // és vissza is tér
                }
                // ha az abortIfNeeded true, aminek feltétele hogy a shouldAbort true, akkor van Error és szintén rejectelünk és ABORT     
                if (this.abortIfNeeded(error, client, done, reject)) {
                    return
                }

                client.query('BEGIN', (error) => {  // egyéb esetben BEGIN, ha hiba van akkor
                    if (this.abortIfNeeded(error, client, done, reject)) {  // megnézzük hogy abortIfNeeded
                        return
                    }

                    body(
                        client, // PoolClient
                        (error: Error | null) => {  // check
                            return this.abortIfNeeded(error, client, done, reject)
                        },
                        (result: T) => {    // onDone
                            this.doCommit(client, done, resolve, result, reject)
                        }
                    )
                })
            })
        })
    }


    variable: (text: string, value: number) => string = (text: string, value: number) => {
        return `${text}-${value}`
    }


}