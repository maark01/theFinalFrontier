import { QueryResultRow } from 'pg'
import { AstronautWithStatusAndImage } from '../../modules/astronaut/model'
import { pg } from '../model'
import { Status } from '../../modules/status/model'


export interface EntityParser<R extends QueryResultRow, T> {
    parse(row: R): T
}

export class AstronautParser implements EntityParser<pg.AstronautWithStatusAndImage, AstronautWithStatusAndImage> {

    parse(row: pg.AstronautWithStatusAndImage): AstronautWithStatusAndImage {
        return {
            id: +row.id,
            name: row.name,
            bio: row.bio,
           /*  status: { id: +row.status.status_id, name: row.status.status_name },
            image: { id: +row.image.image_id, name: row.image.image_name, imageUrl: row.image.image_url }  */
             statusId: +row.status_id,
            statusName: row.status_name,
            imageId: +row.image_id,
            imageName: row.image_name,
            imageUrl: row.image_url 
        }
    }
}