import { db } from '../../db/model'
import { SqlStore } from '../../db/sql-store'
import { Astronaut } from './model'



export interface AstronautsQuery {
    getAllAstronautsFromDatabase(): Promise<Astronaut[]>
}

export class SqlAstronautsQuery extends SqlStore implements AstronautsQuery {
    getAllAstronautsFromDatabase = async (): Promise<Astronaut[]> => {
        return await this.query<Astronaut, db.Astronaut>('SELECT * FROM public.astronauts', [], this.parseAstronauts)
    }

    private parseAstronauts(row: db.Astronaut): Astronaut {
        return {
            id: +row.id,
            name: row.name,
            status: row.status,
            agency: row.agency,
            image: row.image,
            bio: row.bio
        }
    }
}