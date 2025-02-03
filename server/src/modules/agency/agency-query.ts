import { SqlStore } from '../../db/sql-store'
import { AgencyParser, EntityParser } from '../../db/entity-parser/entity-parser'
import { Agency } from './model'
import { Pool } from 'pg'
import { pg } from '../../db/model'



export interface AgencyQuery {
    getAgencies(): Promise<Agency[]>
}

export class SqlAgencyQuery extends SqlStore implements AgencyQuery {

    constructor(db: Pool,
        private agencyParser: EntityParser<pg.Agency, Agency> = new AgencyParser()
    ) {
        super(db)
    }

    getAgencies = async (): Promise<Agency[]> => {
        return await this.query<Agency, pg.Agency>(
            `SELECT id, name, abbrev, founding_year FROM public.agency `,
            [],
            this.agencyParser.parse)
    }
}