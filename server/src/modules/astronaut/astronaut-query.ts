import { db } from '../../db/model'
import { SqlStore } from '../../db/sql-store'
import { Astronaut } from './model'



export interface AstronautQuery {
    getAllAstronauts(): Promise<Astronaut[]>
}

export class SqlAstronautQuery extends SqlStore implements AstronautQuery {
    getAllAstronauts = async (): Promise<any> => {
       return await this.query<Astronaut, db.Astronaut>('SELECT pas.id, pas.name, pas.bio FROM public.astronaut pas ORDER BY pas.id ASC', [], this.parseAstronauts)
    }

    private parseAstronauts(row: db.Astronaut): Astronaut {
        return {
            id: +row.id,
            name: row.name,
            bio: row.bio
        }
    }
}