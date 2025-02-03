import { SpaceDevsAPI } from '../../gateway/space_devs/space_devs-api'
import { Launch, LaunchWithRelations } from './model'
import { AddLaunchMixin } from './add-launch-mixin'
import { LaunchQuery } from './launch-query'



export class LaunchService {

    constructor(
        private readonly spaceDevsAPI: SpaceDevsAPI,
        private readonly addLaunchMixin: AddLaunchMixin,
        private readonly launchQuery: LaunchQuery
    ) { }

    getLaunchesFromAPI = async (): Promise<Launch[]> => {
        return this.spaceDevsAPI.getLaunches()
            .then((response) => {
                const launchesList = response.results.filter(elem => elem.status !== null && elem.image !== null && elem.mission !== null).map(launch => ({
                    id: launch.id,
                    name: launch.name,
                    net: launch.net,
                    status: {
                        id: launch.status.id,
                        name: launch.status.name
                    },
                    image: {
                        id: launch.image.id,
                        name: launch.image.name,
                        imageUrl: launch.image.image_url
                    },
                    mission: {
                        id: launch.mission.id,
                        name: launch.mission.name,
                        type: launch.mission.type,
                        description: launch.mission.description
                    }
                }))

                launchesList.forEach(launch => {
                    this.addLaunchMixin.insertLaunch(launch.id, launch.name, launch.net, launch.status, launch.image, launch.mission)
                })
                return launchesList
            })
            .catch(error => {
                console.error('Error fetching launches: ', error)
                throw new Error('Failed to fetch launches')
            })
    }

    getLaunches = async (search?: string): Promise<LaunchWithRelations[]> => {
        return this.launchQuery.getLaunches(search)
            .then((launch: LaunchWithRelations[]) => {
                if (launch === undefined) {
                    throw new Error('Request refused, incorrect request! Please try again!')
                }
                return launch
            })
            .catch(error => error.message)
    }
}