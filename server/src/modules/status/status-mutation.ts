import { QueryResult } from 'pg'
import { SqlStore } from '../../db/sql-store'
import { Status } from './model'
import { db } from '../../db/model'

export interface StatusMutation {
    addStatus(id: number, name: string): Promise<Status>
}

export class PgStatusMutation extends SqlStore implements StatusMutation {
    addStatus = async (id: number, name: string): Promise<Status> => {
        return this.execute('INSERT INTO public.status (id, name) VALUES ($1, $2)', [id, name])
            .then((result: QueryResult<db.Status>) => {
                const row = result.rows[0]
                return {
                    id,
                    name
                }
            })
    }
}