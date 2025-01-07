import { SqlStore } from '../../db/sql-store'
import { EntityParser } from '../../db/entity-parser/entity-parser'
import { AstronautWithStatusAndImage } from './model'
import { pg } from '../../db/model'
import { Pool } from 'pg'



export interface AstronautQuery {
    getAllAstronauts(): Promise<AstronautWithStatusAndImage[]>
}

export class SqlAstronautQuery extends SqlStore implements AstronautQuery {

    constructor(db: Pool,
        private readonly astronautParser: EntityParser<pg.AstronautWithStatusAndImage, AstronautWithStatusAndImage>
    ) { super(db) }

    getAllAstronauts = async (): Promise<AstronautWithStatusAndImage[]> => {
        return await this.query<AstronautWithStatusAndImage, pg.AstronautWithStatusAndImage>(
            `SELECT ast.id AS "id", ast.name AS "name", ast.bio AS "bio",
                stat.id AS "status_id", stat.name AS "status_name",
                img.id AS "image_id", img.name AS "image_name", img.image_url AS "image_url"
            FROM 
                astronaut ast
            LEFT JOIN 
                astronauts_status aststat ON aststat.astronaut_id = ast.id
            LEFT JOIN 
                status stat ON stat.id = aststat.status_id
            LEFT JOIN 
                astronauts_images astimg ON astimg.astronaut_id = ast.id
            LEFT JOIN 
                image img ON img.id = astimg.image_id
            ORDER BY
	            ast.id ASC;`,
            [],
            this.astronautParser.parse)
    }
}

