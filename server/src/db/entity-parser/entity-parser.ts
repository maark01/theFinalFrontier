import { QueryResultRow } from 'pg'
import { AstronautWithStatusAgencyImage } from '../../modules/astronaut/model'
import { pg } from '../model'


export interface EntityParser<R extends QueryResultRow, T> {
    parse(row: R): T
}

export class AstronautParser implements EntityParser<pg.AstronautWithStatusAgencyImage, AstronautWithStatusAgencyImage> {

    parse(row: pg.AstronautWithStatusAgencyImage): AstronautWithStatusAgencyImage {
        return {
            id: +row.id,
            name: row.name,
            age: +row.age,
            bio: row.bio,
            inSpace: row.in_space,
            statusId: +row.status_id || null,
            statusName: row.status_name || null,
            agencyId: +row.agency_id || null,
            agencyName: row.agency_name || null,
            abbrev: row.abbrev || null,
            foundingYear: +row.founding_year || null,
            imageId: +row.image_id || null,
            imageName: row.image_name || null,
            imageUrl: row.image_url || null,
        }
    }
}