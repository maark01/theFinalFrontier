import { QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Astronaut, Status } from './model'
import { db } from '../../db/model'
import { Agency } from '../agencies/model'
import { Image } from '../images/model'

export interface AstronautsMutation {
    insertAstronautsIntoDatabase(id: number, name: string, status: Status, agency: Agency, image: Image, bio: string): Promise<Astronaut>
}

export class PgAstronautsMutation extends SqlStore implements AstronautsMutation {
    insertAstronautsIntoDatabase = async (id: number, name: string, status: Status, agency: Agency, image: Image, bio: string): Promise<Astronaut> => {
        return this.execute('INSERT INTO public.astronauts (id, name, status, agency, image, bio) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, status.name, agency.name, image.imageUrl, bio])
            .then((result: QueryResult<db.Astronaut>) => {
                const row = result.rows[0]
                return {
                    id,
                    name,
                    status,
                    agency,
                    image,
                    bio
                }
            })
    }
}
