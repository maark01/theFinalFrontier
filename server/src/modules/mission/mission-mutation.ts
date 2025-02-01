import { PoolClient, QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { pg } from '../../db/model'
import { Mission } from './model'

export interface MissionMutation {
    addLaunchMission(id: number, name: string, type: string, description: string): Promise<Mission>
}


export class SqlMissionMutation extends SqlStore implements MissionMutation {
    addLaunchMission = async (id: number, name: string, type: string, description: string): Promise<Mission> => {
        return this.inTx<Mission>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, mission: Mission) => void) => {
            this.addLaunchMissionInTx(id, name, type, description, pool, check, (mission: Mission) => {
                onDone(null, mission)
            })
        })
    }

    protected addLaunchMissionInTx(id: number, name: string, type: string, description: string, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (mission: Mission) => void): void {
        pool.query(`INSERT INTO public.mission (id, name) VALUES ($1, $2)
            ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`,
            [id, name],
            (error: Error | null, result: QueryResult<pg.Launch>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ id, name, type, description, })
            }
        )
    }
}