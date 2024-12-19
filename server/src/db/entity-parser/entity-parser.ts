import { QueryResultRow } from 'pg'
import { AstronautWithStatusAndImage } from '../../modules/astronaut/model'
import { pg } from '../model'


export interface EntityParser<R extends QueryResultRow, T> {
    parse(row: R): T
}

export class AstronautParser implements EntityParser<pg.AstronautWithStatusAndImage, AstronautWithStatusAndImage> {


    parse(row: pg.AstronautWithStatusAndImage): AstronautWithStatusAndImage {
        //console.log(row)
        return {
            id: +row.id,
            name: row.name,
            bio: row.bio,
            statusId: +row.status_id || null,
            statusName: row.status_name || null,
            imageId: +row.image_id || null,
            imageName: row.image_name || null,
            imageUrl: row.image_url || null,
        }
    }
}