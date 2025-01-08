//import { db } from '../../db/model'
import { SqlStore } from '../../db/sql-store'
import { Agency } from './model'



export interface AgencyQuery {
   // getAllAgencies(): Promise<Agency[]>
}

export class SqlAgencyQuery extends SqlStore implements AgencyQuery {
  /*   getAllAgencies = async (): Promise<Agency[]> => {
        return await this.query<Agency, db.Agency>('SELECT id, name FROM agencies', [], this.parseAgency)
    }

    private parseAgency(row: db.Agency): Agency {
        return {
            id: +row.id,
            name: row.name,
        }
    } */
}