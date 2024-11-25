import { Astronaut, AstronautStatus, AstronautImages } from './model'
import { SqlAstronautMutation } from './astronaut-mutation'
import { SqlStatusMutation } from '../status/status-mutation'
import { SqlImageMutation } from '../image/image-mutation'
import { Status } from '../status/model'
import { Image } from '../image/model'
import { SqlStore } from '../../db/sql-store'
import { PoolClient } from 'pg'


export interface AddAstronautMixin {
    insertAstronaut(id: number, name: string, bio: string, image: Image, status: Status): Promise<Astronaut>
}

export interface SqlAddAstronautMixin extends SqlAstronautMutation, SqlStatusMutation, SqlImageMutation { }
export class SqlAddAstronautMixin extends SqlStore implements AddAstronautMixin {
    insertAstronaut(id: number, name: string, bio: string, image: Image, status: Status): Promise<Astronaut> {
        return this.inTx<Astronaut>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, astronaut: Astronaut) => void) => {
            this.addAstronautInTx(id, name, bio, pool, check, (astronaut: Astronaut) => {
                this.addAstronautStatusInTx(status.id, status.name, pool, check, (status: Status) => {
                    this.addAstronautImageInTx(image.id, image.name, image.imageUrl, pool, check, (image: Image) => {
                        this.assignStatusToAstronautsInTx(id, status.id, pool, check, (astronautStatus: AstronautStatus) => {
                            this.assignImageToAstronautsInTx(id, image.id, pool, check, (astronautImages: AstronautImages) => {
                                onDone(null, {
                                    id: astronaut.id, name: astronaut.name, bio: astronaut.bio,
                                    image: { id: image.id, name: image.name, imageUrl: image.imageUrl },
                                    status: { id: status.id, name: status.name },
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}
