import { Agency } from '../agency/model'
import { SqlAgencyMutation } from '../agency/agency-mutation'
import { SqlStore } from '../../db/sql-store'
import { PoolClient } from 'pg'


export interface AddAgencyMixin {
    insertAgency(id: number, name: string, abbrev: string, foundingYear: number): Promise<Agency>
}

export interface SqlAddAgencyMixin extends SqlAgencyMutation { }

export class SqlAddAgencyMixin extends SqlStore implements AddAgencyMixin {
    insertAgency(id: number, name: string, abbrev: string, foundingYear: number): Promise<Agency> {
        return this.inTx<Agency>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, agency: Agency) => void) => {
            this.addAstronautAgencyInTx(id, name, abbrev, foundingYear, pool, check, (agency: Agency) => {
                onDone(null, {
                    id: agency.id, name: agency.name, abbrev: agency.abbrev, foundingYear: agency.foundingYear,
                })
            })
        })
    }
}



