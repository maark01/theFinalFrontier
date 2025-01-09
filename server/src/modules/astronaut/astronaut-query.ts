import { SqlStore } from '../../db/sql-store'
import { EntityParser } from '../../db/entity-parser/entity-parser'
import { AstronautWithStatusAgencyImage } from './model'
import { pg } from '../../db/model'
import { Pool } from 'pg'



export interface AstronautQuery {
    getAllAstronauts(): Promise<AstronautWithStatusAgencyImage[]>
}

export class SqlAstronautQuery extends SqlStore implements AstronautQuery {

    constructor(db: Pool,
        private readonly astronautParser: EntityParser<pg.AstronautWithStatusAgencyImage, AstronautWithStatusAgencyImage>) {
        super(db)
    }

    getAllAstronauts = async (): Promise<AstronautWithStatusAgencyImage[]> => {
        return await this.query<AstronautWithStatusAgencyImage, pg.AstronautWithStatusAgencyImage>(
            `SELECT ast.id AS "id", ast.name AS "name", ast.age AS "age", ast.bio AS "bio", ast.in_space AS "in_space",
                stat.id AS "status_id", stat.name AS "status_name",
                ag.id AS "agency_id", ag.name AS "agency_name", ag.abbrev AS "abbrev",
                img.id AS "image_id", img.name AS "image_name", img.image_url AS "image_url"
            FROM 
                astronaut ast
            LEFT JOIN 
                astronauts_status aststat ON aststat.astronaut_id = ast.id
			LEFT JOIN 
   				 agencies_astronauts agast ON agast.astronaut_id = ast.id
			LEFT JOIN 
    			agency ag ON ag.id = agast.agency_id
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

