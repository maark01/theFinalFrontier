import { HttpService } from '../../services/http'
import { SpaceDevsAPI } from './model'

export interface SpaceDevsAPI {
    getAllAstronauts(): Promise<SpaceDevsAPI.AstronautResults>
    getAllAgencies(): Promise<SpaceDevsAPI.AgencyResults>
}

export class HttpSpaceDevsAPI implements SpaceDevsAPI {

    constructor(private httpService: HttpService) { }

    getAllAstronauts(): Promise<SpaceDevsAPI.AstronautResults> {
        return this.httpService.request<SpaceDevsAPI.AstronautResults>({
            method: 'GET',
            path: `/astronauts/?limit=20`
        })
    }

    getAllAgencies(): Promise<SpaceDevsAPI.AgencyResults> {
        return this.httpService.request<SpaceDevsAPI.AgencyResults>({
            method: 'GET',
            path: `/agencies/?limit=20`
        })
    }
}

