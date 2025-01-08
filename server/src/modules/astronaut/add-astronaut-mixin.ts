import { Astronaut, AstronautWithStatusAgencyImage } from './model'
import { SqlAstronautMutation } from './astronaut-mutation'
import { SqlStatusMutation } from '../status/status-mutation'
import { SqlAgencyMutation } from '../agency/agency-mutation'
import { SqlImageMutation } from '../image/image-mutation'
import { Status } from '../status/model'
import { Agency } from '../agency/model'
import { Image } from '../image/model'
import { SqlStore } from '../../db/sql-store'
import { PoolClient } from 'pg'


export interface AddAstronautMixin {
    insertAstronaut(id: number, name: string, age: number, bio: string, inSpace: boolean, status: Status, agency: Agency, image: Image): Promise<AstronautWithStatusAgencyImage>
}

export interface SqlAddAstronautMixin extends SqlAstronautMutation, SqlStatusMutation, SqlAgencyMutation, SqlImageMutation { }
export class SqlAddAstronautMixin extends SqlStore implements AddAstronautMixin {
    insertAstronaut(id: number, name: string, age: number, bio: string, inSpace: boolean, status: Status, agency: Agency, image: Image): Promise<AstronautWithStatusAgencyImage> {
        return this.inTx<AstronautWithStatusAgencyImage>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, astronaut: AstronautWithStatusAgencyImage) => void) => {
            this.addAstronautInTx(id, name, age, bio, inSpace, pool, check, (astronaut: Astronaut) => {
                this.addAstronautStatusInTx(status.id, status.name, pool, check, (status: Status) => {
                    this.addAstronautAgencyInTx(agency.id, agency.name, agency.abbrev, agency.foundingYear, pool, check, (agency: Agency) => {
                        this.addAstronautImageInTx(image.id, image.name, image.imageUrl, pool, check, (image: Image) => {
                            this.assignStatusToAstronautsInTx(id, status.id, pool, check, () => {
                                this.assignAgencyToAstronautsInTx(id, agency.id, pool, check, () => {
                                    this.assignImageToAstronautsInTx(id, image.id, pool, check, () => {
                                        onDone(null, {
                                            id: astronaut.id, name: astronaut.name, age: astronaut.age, bio: astronaut.bio, inSpace: astronaut.inSpace,
                                            statusId: status.id, statusName: status.name,
                                            agencyId: agency.id, agencyName: agency.name, abbrev: agency.abbrev, foundingYear: agency.foundingYear,
                                            imageId: image.id, imageName: image.name, imageUrl: image.imageUrl,
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}
