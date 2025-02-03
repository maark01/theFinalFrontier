import { PoolClient, QueryResult } from 'pg'
import { Launch, LaunchStatus, LaunchImage, LaunchMission } from './model'
import { SqlStore } from '../../db/sql-store'
import { pg } from '../../db/model'

export interface LaunchMutation {
    addLaunch(id: string, name: string, net: string): Promise<Launch>
}

export class SqlLaunchMutation extends SqlStore implements LaunchMutation {

    addLaunch(id: string, name: string, net: string): Promise<Launch> {
        return this.inTx<Launch>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, launch: Launch) => void) => {
            this.addLaunchInTx(id, name, net, pool, check, (launch: Launch) => {
                onDone(null, launch)
            })
        })
    }

    protected addLaunchInTx(id: string, name: string, net: string, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (launch: Launch) => void): void {
        pool.query(`INSERT INTO public.launch (id, name, net) VALUES ($1, $2, $3)
        ON CONFLICT (ID) DO UPDATE SET name = EXCLUDED.name, net = EXCLUDED.net`,
            [id, name, net],
            (error: Error | null, result: QueryResult<pg.Launch>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ id, name, net })
            })
    }

    protected assignStatusToLaunchInTx(launchId: string, statusId: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (launchStatus: LaunchStatus) => void): void {
        pool.query(`INSERT INTO public.launches_status (launch_id, status_id) VALUES ($1, $2)`,
            [launchId, statusId],
            (error: Error | null, result: QueryResult<pg.LaunchStatus>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ launchId, statusId })
            }
        )
    }

    protected assignImageToLaunchInTx(launchId: string, imageId: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (launchImage: LaunchImage) => void): void {
        pool.query(`INSERT INTO public.launches_images (launch_id, image_id) VALUES ($1, $2)`,
            [launchId, imageId],
            (error: Error | null, result: QueryResult<pg.LaunchImage>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ launchId, imageId })
            }
        )
    }

    protected assignMissionToLaunchInTx(launchId: string, missionId: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (launchMission: LaunchMission) => void): void {
        pool.query(`INSERT INTO public.launches_missions (launch_id, mission_id) VALUES ($1, $2)`,
            [launchId, missionId],
            (error: Error | null, result: QueryResult<pg.LaunchMission>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ launchId, missionId })
            }
        )
    }
}