import { db } from '../../db/model'
import { SqlStore } from '../../db/sql-store'
import { Agency } from './model'



export interface AgenciesQuery {
    getAllAgencies(): Promise<Agency[]>
}

export class SqlAgenciesQuery extends SqlStore implements AgenciesQuery {
    getAllAgencies = async (): Promise<Agency[]> => {
        return await this.query<Agency, db.Agency>('SELECT id, name FROM agencies',[], this.parseAgencies)
    }

    private parseAgencies(row: db.Astronaut): Agency {
        return {
            id: +row.id,
            name: row.name,
        }
    }
}