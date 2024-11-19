import { SpaceDevsAPI } from '../../gateway/space_devs/space_devs-api'
import { Agency } from './model'


export class AgenciesService {

    constructor(private spaceDevsAPI: SpaceDevsAPI) { }

/*     async getAllAgencies(): Promise<Agency[]> {
        return this.spaceDevsAPI.getAllAgencies()
            .then(agency => {
                if (!agency) {
                    return [] 
                }
                console.log(agency)
                return agency 
            })
    } */
}