import { PoolClient, QueryResult } from 'pg'
import { Astronaut, AstronautStatus, AstronautImage, AstronautAgency } from './model'
import { SqlStore } from '../../db/sql-store'
import { pg } from '../../db/model'

export interface AstronautMutation {
    addAstronaut(id: number, name: string, age: number, bio: string, inSpace: boolean): Promise<Astronaut>
}

export class SqlAstronautMutation extends SqlStore implements AstronautMutation {

    addAstronaut = (id: number, name: string, age: number, bio: string, inSpace: boolean): Promise<Astronaut> => {
        return this.inTx<Astronaut>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, astronaut: Astronaut) => void) => {
            this.addAstronautInTx(id, name, age, bio, inSpace, pool, check, (astronaut: Astronaut) => {
                onDone(null, astronaut)
            })
        })
    }

    protected addAstronautInTx(id: number, name: string, age: number, bio: string, inSpace: boolean, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (astronaut: Astronaut) => void): void {
        pool.query('INSERT INTO public.astronaut (id, name, age, bio, in_space) VALUES ($1, $2, $3, $4, $5)',
            [id, name, age, bio, inSpace],
            (error: Error | null, result: QueryResult<pg.Astronaut>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ id, name, age, bio, inSpace })
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

    protected assignAgencyToAstronautsInTx(astronautId: number, agencyId: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (astronautAgency: AstronautAgency) => void): void {
        pool.query('INSERT INTO public.agencies_astronauts (astronaut_id, agency_id) VALUES ($1, $2)',
            [astronautId, agencyId],
            (error: Error | null, result: QueryResult<pg.AstronautAgency>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ astronautId, agencyId })
            }
        )
    }

    protected assignImageToAstronautsInTx(astronautId: number, imageId: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (astronautImage: AstronautImage) => void): void {
        pool.query('INSERT INTO public.astronauts_images (astronaut_id, image_id) VALUES ($1, $2)',
            [astronautId, imageId],
            (error: Error | null, result: QueryResult<pg.AstronautImage>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ astronautId, imageId })
            }
        )
    }
}
