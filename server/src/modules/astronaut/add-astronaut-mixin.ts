import { SqlAstronautMutation } from './astronaut-mutation'
import { SqlStatusMutation } from '../status/status-mutation'
import { SqlImageMutation } from '../image/image-mutation'
import { SqlStore } from '../../db/sql-store'
import { Astronaut } from './model'
import { Status } from '../status/model'
import { Image } from '../image/model'
import { PoolClient } from 'pg'


export interface AddAstronautMixin {
    addAstronaut(id: number, name: string, bio: string): Promise<Astronaut>
}

export interface SqlAddAstronautMixin extends SqlAstronautMutation, SqlStatusMutation, SqlImageMutation { }
export class SqlAddAstronautMixin extends SqlStore implements AddAstronautMixin {

    addAstronaut = async (id: number, name: string, bio: string): Promise<Astronaut> => {
        return this.inTx<Astronaut>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, astronaut: Astronaut) => void) => {
            this.addAstronautInTx(id, name, bio, pool, check, (astronaut: Astronaut) => {
                this.addAstronautStatusInTx(id, name, pool, check, (status: Status) => {
                    this.addAstronautImageInTx(id, name, imageUrl, pool, check, (image: Image) => {
                        onDone(null, {
                            id: astronaut.id, name: astronaut.name, bio: astronaut.bio,
                            status: { id: status.id, name: status.name },
                            image: { id: image.id, name: image.name, imageUrl: image.imageUrl }
                        })
                    })
                })
            })
        })
    }
}