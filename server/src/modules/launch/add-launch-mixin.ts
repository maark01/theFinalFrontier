import { Launch, LaunchWithRelations } from './model'
import { SqlLaunchMutation } from './launch-mutation'
import { SqlStatusMutation } from '../status/status-mutation'
import { SqlImageMutation } from '../image/image-mutation'
import { SqlMissionMutation } from '../mission/mission-mutation'
import { Status } from '../status/model'
import { Image } from '../image/model'
import { Mission } from '../mission/model'
import { SqlStore } from '../../db/sql-store'
import { PoolClient } from 'pg'

export interface AddLaunchMixin {
    insertLaunch(id: string, name: string, net: string, status: Status, image: Image, mission: Mission): Promise<LaunchWithRelations>
}

export interface SqlAddLaunchMixin extends SqlLaunchMutation, SqlStatusMutation, SqlImageMutation, SqlMissionMutation { }

export class SqlAddLaunchMixin extends SqlStore implements AddLaunchMixin {
    insertLaunch(id: string, name: string, net: string, status: Status, image: Image, mission: Mission): Promise<LaunchWithRelations> {
        return this.inTx<LaunchWithRelations>((pool: PoolClient, check: (error: Error | null) => boolean, onDone: (error: Error | null, launch: LaunchWithRelations) => void) => {
            this.addLaunchInTx(id, name, net, pool, check, (launch: Launch) => {
                this.addLaunchStatusInTx(status.id, status.name, pool, check, (status: Status) => {
                    this.addLaunchImageInTx(image.id, image.name, image.imageUrl, pool, check, (image: Image) => {
                        this.addLaunchMissionInTx(mission.id, mission.name, mission.type, mission.description, pool, check, (mission: Mission) => {
                            this.assignStatusToLaunchInTx(id, status.id, pool, check, () => {
                                this.assignImageToLaunchInTx(id, image.id, pool, check, () => {
                                    this.assignMissionToLaunchInTx(id, mission.id, pool, check, () => {
                                        onDone(null, {
                                            id: launch.id, name: launch.name, net: launch.net,
                                            statusId: status.id, statusName: status.name,
                                            imageId: image.id, imageName: image.name, imageUrl: image.imageUrl,
                                            missionId: mission.id, missionName: mission.name, missionType: mission.type, missionDescription: mission.description
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