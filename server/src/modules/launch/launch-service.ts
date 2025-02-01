import { SpaceDevsAPI } from "../../gateway/space_devs/space_devs-api";
import { Launch } from "./model";


export class LaunchService {

    constructor(
        private readonly spaceDevsAPI: SpaceDevsAPI
    ) { }

    getLaunchesFromAPI = async (): Promise<Launch[]> => {
        const response = await this.spaceDevsAPI.getLaunches()
        const launchesList = response.results.map(launch => ({
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
        return launchesList
    }
}