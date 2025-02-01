import { PoolClient, QueryResult } from 'pg'
import { Launch, LaunchStatus, LaunchImage } from './model'
import { SqlStore } from '../../db/sql-store'
import { pg } from '../../db/model'

export interface LaunchMutation {
    addLaunch(id: string, name: string, net: Date): Promise<Launch>
}

export class SqlLaunchMutation extends SqlStore implements LaunchMutation {

    addLaunch(id: string, name: string, net: Date): Promise<Launch> {
        return this.inTx<Launch>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, launch: Launch) => void) => {
            this.addLaunchInTx(id, name, net, pool, check, (launch: Launch) => {
                onDone(null, launch)
            })
        })
    }

    protected addLaunchInTx(id: string, name: string, net: Date, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (launch: Launch) => void): void {
        pool.query(`INSERT INTO public.launch (id, name, net)
        VALUES ($1, $2, $3)
        ON CONFLICT (ID) DO UPDATE SET name = EXCLUDED.name, net = EXCLUDED.net`,
    [id, name, net],
    (error: Error | null, result: QueryResult<pg.Launch>)=> {
        if (check(error)) {return}
        const row = result.rows[0]
        onDone({id, name, net})
    })
    }
}