import { SqlStore } from '../../db/sql-store'
import { LaunchParser, EntityParser } from '../../db/entity-parser/entity-parser'
import { LaunchWithRelations } from './model'
import { pg } from '../../db/model'
import { Pool } from 'pg'

export interface LaunchQuery {
    getLaunches(search?: string): Promise<LaunchWithRelations[]>
}

export class SqlLaunchQuery extends SqlStore implements LaunchQuery {
    constructor(db: Pool,
        private readonly launchParser: EntityParser<pg.LaunchWithRelations, LaunchWithRelations> = new LaunchParser()
    ) {
        super(db)
    }

    getLaunches = async (search?: string): Promise<LaunchWithRelations[]> => {
        let query = `
        SELECT lch.id AS "id", lch.name AS "name", lch.net AS "net", stat.id AS "status_id", stat.name AS "status_name", img.id AS "image_id", img.name AS "image_name", img.image_url AS "image_url", mss.id AS "mission_id", mss.name AS "mission_name", mss.type AS "mission_type", mss.description AS "mission_description"
        FROM 
            launch lch
        LEFT JOIN
            launches_status lchstat ON lchstat.launch_id = lch.id
        LEFT JOIN
            launch_status stat ON stat.id = lchstat.status_id
        LEFT JOIN 
            launches_images lchimg ON lchimg.launch_id = lch.id
        LEFT JOIN 
            image img ON img.id = lchimg.image_id
        LEFT JOIN
            launches_missions lchmss ON lchmss.launch_id = lch.id
        LEFT JOIN
            mission mss ON mss.id = lchmss.mission_id
        `
        if (search) {
            query += ` WHERE lch.name ILIKE $1`
        }

        query += ` ORDER BY lch.id ASC;`

        try {
            const result = await this.db.query(
                query,
                search ? [`%${search}%`] : []
            )
            return result.rows.map(this.launchParser.parse)
        } catch (error) {
            console.error('Error executing query:', error)
            throw new Error('Failed to execute query')
        }
    }
}