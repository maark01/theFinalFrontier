import { QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Astronaut} from './model'
import { db } from '../../db/model'

export interface AstronautsMutation {
    assignAstronauts(id: number, name: string, bio: string): Promise<Astronaut>
}

export class PgAstronautsMutation extends SqlStore implements AstronautsMutation {
    assignAstronauts = async (id: number, name: string, bio: string): Promise<Astronaut> => {
        return this.execute('INSERT INTO public.astronauts (id, name, bio) VALUES ($1, $2, $3)', [id, name, bio])
            .then((result: QueryResult<db.Astronaut>) => {
                const row = result.rows[0]
                return {
                    id,
                    name,
                    bio
                }
            })
    }
}
