import { AgenciesAPI } from '../../gateway/agenciesapi/agencies-api'
import { Agency } from './model'


export class AgenciesService {

    constructor(private agenciesAPI: AgenciesAPI) { }

    async getAllAgencies(): Promise<Agency[]> {
        return this.agenciesAPI.getAllAgencies()
            .then(agency => {
                if (!agency) {
                    return [] 
                }
                console.log(agency)
                return agency 
            })
    }
}