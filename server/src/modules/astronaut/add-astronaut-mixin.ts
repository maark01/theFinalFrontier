import { Astronaut, AstronautStatus, AstronautImages, AstronautWithStatusAndImage } from './model'
import { SqlAstronautMutation } from './astronaut-mutation'
import { SqlStatusMutation } from '../status/status-mutation'
import { SqlImageMutation } from '../image/image-mutation'
import { Status } from '../status/model'
import { Image } from '../image/model'
import { SqlStore } from '../../db/sql-store'
import { PoolClient } from 'pg'


export interface AddAstronautMixin {
    insertAstronaut(id: number, name: string, bio: string, image: Image, status: Status): Promise<AstronautWithStatusAndImage>
}

export interface SqlAddAstronautMixin extends SqlAstronautMutation, SqlStatusMutation, SqlImageMutation { }
export class SqlAddAstronautMixin extends SqlStore implements AddAstronautMixin {
    insertAstronaut(id: number, name: string, bio: string, image: Image, status: Status): Promise<AstronautWithStatusAndImage> {
        return this.inTx<AstronautWithStatusAndImage>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, astronaut: AstronautWithStatusAndImage) => void) => {
            this.addAstronautInTx(id, name, bio, pool, check, (astronaut: Astronaut) => {
                this.addAstronautStatusInTx(status.id, status.name, pool, check, (status: Status) => {
                    this.addAstronautImageInTx(image.id, image.name, image.imageUrl, pool, check, (image: Image) => {
                        this.assignStatusToAstronautsInTx(id, status.id, pool, check, () => {
                            this.assignImageToAstronautsInTx(id, image.id, pool, check, () => {
                                onDone(null, {
                                    id: astronaut.id, name: astronaut.name, bio: astronaut.bio,
                                    imageId: image.id, imageName: image.name, imageUrl: image.imageUrl ,
                                    statusId: status.id, statusName: status.name ,
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}
