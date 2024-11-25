import { PoolClient, QueryResult } from 'pg'
import { Astronaut, AstronautStatus, AstronautImages } from './model'
import { SqlStore } from '../../db/sql-store'
import { pg } from '../../db/model'

export interface AstronautMutation {
    addAstronaut(id: number, name: string, bio: string): Promise<Astronaut>
}

export class SqlAstronautMutation extends SqlStore implements AstronautMutation {

    addAstronaut = (id: number, name: string, bio: string): Promise<Astronaut> => {
        return this.inTx<Astronaut>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, astronaut: Astronaut) => void) => {
            this.addAstronautInTx(id, name, bio, pool, check, (astronaut: Astronaut) => {
                onDone(null, astronaut)
            })
        })
    }

    protected addAstronautInTx(id: number, name: string, bio: string, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (astronaut: Astronaut) => void): void {
        pool.query('INSERT INTO public.astronaut (id, name, bio) VALUES ($1, $2, $3)',
            [id, name, bio],
            (error: Error | null, result: QueryResult<pg.Astronaut>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ id, name, bio })
            }
        )
    }

    protected assignStatusToAstronautsInTx(astronautId: number, statusId: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (astronautStatus: AstronautStatus) => void): void {
        pool.query('INSERT INTO public.astronauts_status (astronaut_id, status_id) VALUES ($1, $2)',
            [astronautId, statusId],
            (error: Error | null, result: QueryResult<pg.AstronautStatus>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ astronautId, statusId })
            }
        )
    }

    protected assignImageToAstronautsInTx(astronautId: number, imageId: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (astronautStatus: AstronautImages) => void): void {
        pool.query('INSERT INTO public.astronauts_images (astronaut_id, image_id) VALUES ($1, $2)',
            [astronautId, imageId],
            (error: Error | null, result: QueryResult<pg.AstronautImages>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ astronautId, imageId })
            }
        )
    }
}
