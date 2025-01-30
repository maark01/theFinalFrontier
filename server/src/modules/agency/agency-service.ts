import { SpaceDevsAPI } from '../../gateway/space_devs/space_devs-api'
import { AgencyQuery } from './agency-query'
import { AddAgencyMixin } from './add-agency-mixin'
import { Agency } from './model'


export class AgencyService {

    constructor(
        private readonly spaceDevsAPI: SpaceDevsAPI,
        private readonly addAgencyMixin: AddAgencyMixin,
        private readonly agencyQuery: AgencyQuery
    ) { }

    getAgenciesFromAPI = async (): Promise<Agency[]> => {
        return this.spaceDevsAPI.getAgencies()
            .then((response) => {
                const angenciesList = response.results.map(agency => ({
                    id: agency.id,
                    name: agency.name,
                    abbrev: agency.abbrev,
                    foundingYear: agency.founding_year
                }))

                angenciesList.forEach(agency => {
                    this.addAgencyMixin.insertAgency(agency.id, agency.name, agency.abbrev, agency.foundingYear)
                })
                return angenciesList
            })
            .catch(error => {
                console.error('Error fetching agencies: ', error)
                throw new Error('Failed to fetch agencies')
            })
    }

    async getAgencies(): Promise<Agency[]> {
        return this.agencyQuery.getAgencies()
            .then((agency: Agency[]) => {
                if (agency === undefined) {
                    throw new Error('Request refused, incorrect request! Please try again!')
                }
                return agency
            })
            .catch(error => error.message)
    }
}