import { QueryResultRow } from 'pg'
import {Astronaut} from '../../modules/astronaut/model'


export interface EntityParser<R extends QueryResultRow, T> {
    parse(row: R): T
}

export class AstronautParser implements EntityParser<QueryResultRow, Astronaut> {
    
    parse(row: QueryResultRow): Astronaut {
        return {
            id: +row.id,
            name: row.name,
            status: {statusId: row.status.id, statusName: row.status.name},
            image: row.image,
            bio: row.bio
        }
    }
}