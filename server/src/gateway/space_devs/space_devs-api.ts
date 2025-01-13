import { HttpService } from '../../services/http'
import { SpaceDevsAPI } from './model'

export interface SpaceDevsAPI {
    getAllAstronauts(): Promise<SpaceDevsAPI.AstronautResults>
    getAllAgencies(): Promise<SpaceDevsAPI.AgencyResults>
}

export class HttpSpaceDevsAPI implements SpaceDevsAPI {

    constructor(private httpService: HttpService) { }

    async getAllAstronauts(): Promise<SpaceDevsAPI.AstronautResults> {
        const promises: Promise<SpaceDevsAPI.AstronautResults>[] = []
        for (let i = 0; i <= 700; i += 100) {
            promises.push(this.httpService.request<SpaceDevsAPI.AstronautResults>({
                method: 'GET',
                path: `/astronauts/?limit=100&offset=${i}`
            }))
        }
        const results = await Promise.all(promises)
        const combinedResults: SpaceDevsAPI.AstronautResults = {
            results: results.flatMap(astronaut => astronaut.results)
        }
        return combinedResults
    }

   async getAllAgencies(): Promise<SpaceDevsAPI.AgencyResults> {
        const promises: Promise<SpaceDevsAPI.AgencyResults>[] = []
        for (let j = 0; j <= 300; j += 100) {
            promises.push(this.httpService.request<SpaceDevsAPI.AgencyResults>({
                method: 'GET',
                path: `/agencies/?limit=100&offset=${j}`
            }))
        }
        const results = await Promise.all(promises)
        const combinedResults: SpaceDevsAPI.AgencyResults = {
            results: results.flatMap(agency => agency.results)
        }
        return combinedResults
    }
}

