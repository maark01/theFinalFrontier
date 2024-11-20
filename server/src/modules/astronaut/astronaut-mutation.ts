import { QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Astronaut} from './model'
import { db } from '../../db/model'

export interface AstronautMutation {
    addAstronauts(id: number, name: string, bio: string): Promise<Astronaut>
}

export class PgAstronautMutation extends SqlStore implements AstronautMutation {
    addAstronauts = async (id: number, name: string, bio: string): Promise<Astronaut> => {
        return this.execute('INSERT INTO public.astronaut (id, name, bio) VALUES ($1, $2, $3)', [id, name, bio])
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
