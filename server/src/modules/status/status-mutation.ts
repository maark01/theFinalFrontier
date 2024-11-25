import { PoolClient, QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Status } from './model'
import { pg } from '../../db/model'

export interface StatusMutation {
    addAstronautStatus(id: number, name: string): Promise<Status>
}

export class SqlStatusMutation extends SqlStore implements StatusMutation {
    addAstronautStatus = async (id: number, name: string): Promise<Status> => {
        return this.inTx<Status>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, status: Status) => void) => {
            this.addAstronautStatusInTx(id, name, pool, check, (status: Status) => {
                onDone(null, status)
            })
        })
    }

    protected addAstronautStatusInTx(id: number, name: string, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (status: Status) => void): void {
        pool.query(`INSERT INTO public.status (id, name) VALUES ($1, $2)
            ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`,
            [id, name],
            (error: Error | null, result: QueryResult<pg.Astronaut>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ id, name })
            }
        )
    }
}

