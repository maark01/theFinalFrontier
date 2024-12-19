import { HttpService } from '../../services/http'
import { SpaceDevsAPI } from './model'

export interface SpaceDevsAPI {
    getAllAstronauts(): Promise<SpaceDevsAPI.Results>
}


export class HttpSpaceDevsAPI implements SpaceDevsAPI {

    constructor(private httpService: HttpService) { }

    getAllAstronauts(): Promise<SpaceDevsAPI.Results> {
        return this.httpService.request<SpaceDevsAPI.Results>({
            method: 'GET',
            path: `/astronauts/?limit=20`
        })
    }
}

