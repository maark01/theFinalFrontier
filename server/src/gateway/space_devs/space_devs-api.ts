import { SpaceDevsAPI } from './model'
import { HttpService } from '../../services/http'
require('dotenv').config()


export interface SpaceDevsAPI {
    getAllAstronauts(): Promise<SpaceDevsAPI.AstronautResults>
    getAllAgencies(): Promise<SpaceDevsAPI.AgencyResults>
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class HttpSpaceDevsAPI implements SpaceDevsAPI {

    constructor(private http: HttpService) { }

    async getAllAstronauts(): Promise<SpaceDevsAPI.AstronautResults> {
        const apiKey = process.env.API_KEY
        const promises: Promise<SpaceDevsAPI.AstronautResults>[] = []
        for (let i = 0; i <= 700; i += 100) {
            promises.push(
                delay(2000)
                    .then(() =>
                        this.http.request<SpaceDevsAPI.AstronautResults>({
                            method: 'GET',
                            path: `/astronauts/?limit=100&offset=${i}`,
                            headers: { Authorization: `Token ${apiKey}` }
                        })
                    )
            )
        }
        const results = await Promise.all(promises)
        const combinedResults: SpaceDevsAPI.AstronautResults = {
            results: results.flatMap(astronaut => astronaut.results)
        }
        return combinedResults
    }

    async getAllAgencies(): Promise<SpaceDevsAPI.AgencyResults> {
        const apiKey = process.env.API_KEY
        const promises: Promise<SpaceDevsAPI.AgencyResults>[] = []
        for (let j = 0; j <= 300; j += 100) {
            promises.push(
                delay(2000)
                    .then(() =>
                        this.http.request<SpaceDevsAPI.AgencyResults>({
                            method: 'GET',
                            path: `/agencies/?limit=100&offset=${j}`,
                            headers: { Authorization: `Token ${apiKey}` }
                        })
                    )
            )
        }
        const results = await Promise.all(promises)
        const combinedResults: SpaceDevsAPI.AgencyResults = {
            results: results.flatMap(agency => agency.results)
        }
        return combinedResults
    }
}
