import { HttpService } from '../../services/http'
import { AstronautsAPI } from './model'

export interface AstronautsAPI {
    getAllAstronauts(): Promise<AstronautsAPI.Results>
}


export class HttpAstronautsAPI implements AstronautsAPI {

    constructor(private httpService: HttpService) { }

    getAllAstronauts(): Promise<AstronautsAPI.Results> {
        return this.httpService.request<AstronautsAPI.Results>({
            method: 'GET',
            path: `/astronauts`
        })
    }
}

