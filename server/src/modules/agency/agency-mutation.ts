import { PoolClient, QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Agency } from './model'
import { pg } from '../../db/model'

export interface AgencyMutation {
    addAgency(id: number, name: string, abbrev: string, foundingYear: number): Promise<Agency>
}

export class SqlAgencyMutation extends SqlStore implements AgencyMutation {
    addAgency = async (id: number, name: string, abbrev: string, foundingYear: number): Promise<Agency> => {
        return this.inTx<Agency>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, agency: Agency) => void) => {
            this.addAgencyInTx(id, name, abbrev, foundingYear, pool, check, (agency: Agency) => {
                onDone(null, agency)
            })
        })
    }

    protected addAgencyInTx(id: number, name: string, abbrev: string, foundingYear: number, pool: PoolClient, check: (error: Error | null) => boolean, onDone: (agency: Agency) => void): void {
        pool.query(`INSERT INTO public.agency (id, name, abbrev, founding_year) VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, abbrev = EXCLUDED.abbrev, founding_year = EXCLUDED.founding_year`,
            [id, name, abbrev, foundingYear],
            (error: Error | null, result: QueryResult<pg.Astronaut>) => {
                if (check(error)) { return }
                const row = result.rows[0]
                onDone({ id, name, abbrev, foundingYear })
            }
        )
    }
}
