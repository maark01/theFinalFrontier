import { HttpService } from '../../services/http'
import { AgenciesAPI } from './model'

export interface AgenciesAPI {
    getAllAgencies(): Promise<AgenciesAPI.Agency[]>
}

export class HttpAgenciesAPI implements AgenciesAPI {

    constructor(private httpService: HttpService) { }

    getAllAgencies(): Promise<AgenciesAPI.Agency[]> {
        return this.httpService.request<AgenciesAPI.Agency[]>({
            method: 'GET',
            path: `/agencies`
        })
    }
}