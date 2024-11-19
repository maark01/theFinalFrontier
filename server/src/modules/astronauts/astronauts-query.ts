import { db } from '../../db/model'
import { SqlStore } from '../../db/sql-store'
import { Astronaut } from './model'



export interface AstronautsQuery {
    getAllAstronauts(): Promise<Astronaut[]>
}

export class SqlAstronautsQuery extends SqlStore implements AstronautsQuery {
    getAllAstronauts = async (): Promise<any> => {
       return await this.query<Astronaut, db.Astronaut>('SELECT id, name, bio FROM public.astronauts', [], this.parseAstronauts)
    }

    private parseAstronauts(row: db.Astronaut): Astronaut {
        return {
            id: +row.id,
            name: row.name,
            bio: row.bio
        }
    }
}