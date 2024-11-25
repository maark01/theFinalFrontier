import { SqlStore } from '../../db/sql-store'
import { AstronautParser, EntityParser } from '../../db/entity-parser/entity-parser'
import { Astronaut, AstronautWithStatusAndImage } from './model'
import { db } from '../../db/model'
import { Pool } from 'pg'



export interface AstronautQuery {
    getAllAstronauts(): Promise<AstronautWithStatusAndImage[]>
}

export class SqlAstronautQuery extends SqlStore implements AstronautQuery {

    constructor(db: Pool,
        private astronautParser: EntityParser<db.AstronautWithStatusAndImage, AstronautWithStatusAndImage> = new AstronautParser()
    ) { super(db) }

    getAllAstronauts = async (): Promise<AstronautWithStatusAndImage[]> => {
        return await this.query<AstronautWithStatusAndImage, db.AstronautWithStatusAndImage>(
            `SELECT ast.id, ast.name, ast.bio, stat.id, stat.name, img.id, img.name, img.image_url
                FROM public.astronaut ast 
                LEFT JOIN astronauts_images astimg ON astimg.astronaut_id = ast.id 
                LEFT JOIN image img ON img.id = astimg.image_id 
                LEFT JOIN astronauts_status aststat ON aststat.astronaut_id = ast.id 
                LEFT JOIN status stat ON stat.id = aststat.status_id 
                ORDER BY ast.id ASC;`,
            [],
            this.astronautParser.parse)
    }
}

