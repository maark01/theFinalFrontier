import { SpaceDevsAPI } from '../../gateway/space_devs/space_devs-api'
import { AgencyQuery } from './agency-query'
import { Agency } from './model'


export class AgencyService {

    constructor(
        private readonly spaceDevsAPI: SpaceDevsAPI,
        private readonly agencyQuery: AgencyQuery
    ) { }

    async getAllAgencies(): Promise<Agency[]> {
        return this.agencyQuery.getAllAgencies()
            .then((agency: Agency[]) => {
                if (agency === undefined) {
                    throw new Error('Request refused, incorrect request! Please try again!')
                }
                return agency
            })
            .catch(error => error.message)
    }
}