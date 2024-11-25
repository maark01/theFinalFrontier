import { SqlStore } from '../../db/sql-store'
import { Astronaut } from './model'
import { db } from '../../db/model'
import { AstronautParser, EntityParser } from '../../db/entity-parser/entity-parser'
import { Pool } from 'pg'



export interface AstronautQuery {
    getAllAstronauts(): Promise<Astronaut[]>
}

export class SqlAstronautQuery extends SqlStore implements AstronautQuery {

    constructor(db: Pool,
        private astronautParser: EntityParser<db.Astronaut, Astronaut> = new AstronautParser()
    ) { super(db) }

    getAllAstronauts = async (): Promise<any[]> => {
        return await this.query<Astronaut, db.Astronaut>('SELECT ast.id, ast.name, img.image_url, ast.bio FROM public.astronaut ast JOIN astronauts_images astimg ON astimg.astronaut_id = ast.id JOIN image img ON img.id = astimg.image_id JOIN astronauts_status aststat ON aststat.astronaut_id = ast.id JOIN status stat ON stat.id = aststat.status_id ORDER BY ast.id ASC;',
            [],
            this.astronautParser.parse)
    }
}

