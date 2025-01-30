import { SpaceDevsAPI } from './model'
import { HttpService } from '../../services/http'
require('dotenv').config()


export interface SpaceDevsAPI {
    getAstronauts(): Promise<SpaceDevsAPI.AstronautResults>
    getAgencies(): Promise<SpaceDevsAPI.AgencyResults>
    getLaunches(): Promise<SpaceDevsAPI.LaunchesResults>
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class HttpSpaceDevsAPI implements SpaceDevsAPI {

    constructor(private http: HttpService) { }

    async getAstronauts(): Promise<SpaceDevsAPI.AstronautResults> {
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

    async getAgencies(): Promise<SpaceDevsAPI.AgencyResults> {
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

    async getLaunches(): Promise<SpaceDevsAPI.LaunchesResults> {
        const apiKey = process.env.API_KEY
        const promises: Promise<SpaceDevsAPI.LaunchesResults>[] = []
        for (let k = 0; k <= 7400; k += 100) {
            promises.push(
                delay(2000)
                    .then(() =>
                        this.http.request<SpaceDevsAPI.LaunchesResults>({
                            method: 'GET',
                            path: `/launches/?limit=100&offset=${k}`,
                            headers: { Authorization: `Token ${apiKey}` }
                        }))
            )
        }
        const results = await Promise.all(promises)
        const combinedResults: SpaceDevsAPI.LaunchesResults = {
            results: results.flatMap(launch => launch.results)
        }
        return combinedResults
    }
}
