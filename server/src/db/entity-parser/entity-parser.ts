import { QueryResultRow } from 'pg'
import { AstronautWithStatusAndImage } from '../../modules/astronaut/model'
import { db } from '../model'


export interface EntityParser<R extends QueryResultRow, T> {
    parse(row: R): T
}

export class AstronautParser implements EntityParser<db.AstronautWithStatusAndImage, AstronautWithStatusAndImage> {

    parse(row: db.AstronautWithStatusAndImage): AstronautWithStatusAndImage {
        return {
            id: +row.id,
            name: row.name,
            bio: row.bio,
            status: { id: +row.status.id, name: row.status.name },
            image: {id: +row.image.id, name: row.image.name, imageUrl: row.image.imageUrl }
        }
    }
}