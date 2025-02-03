import { QueryResultRow } from 'pg'
import { AstronautWithRelations } from '../../modules/astronaut/model'
import { Agency } from '../../modules/agency/model'
import { pg } from '../model'
import { LaunchWithRelations } from '../../modules/launch/model'


export interface EntityParser<R extends QueryResultRow, T> {
    parse(row: R): T
}

export class AstronautParser implements EntityParser<pg.AstronautWithRelations, AstronautWithRelations> {

    parse(row: pg.AstronautWithRelations): AstronautWithRelations {
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

export class AgencyParser implements EntityParser<pg.Agency, Agency> {

    parse(row: pg.Agency): Agency {
        return {
            id: +row.id,
            name: row.name,
            abbrev: row.abbrev,
            foundingYear: +row.founding_year
        }
    }
}

export class LaunchParser implements EntityParser<pg.LaunchWithRelations, LaunchWithRelations> {

    parse(row: pg.LaunchWithRelations): LaunchWithRelations {
        return {
            id: row.id,
            name: row.name,
            net: row.net,
            statusId: +row.status_id || null,
            statusName: row.status_name || null,
            missionId: +row.mission_id || null,
            missionName: row.mission_name || null,
            missionType: row.mission_type || null,
            missionDescription: row.mission_description || null,
            imageId: +row.image_id || null,
            imageName: row.image_name || null,
            imageUrl: row.image_url || null,
        }
    }
}