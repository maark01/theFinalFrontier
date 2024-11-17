import { AgenciesService } from '../modules/agencies/agencies-service'
import { HttpAgenciesAPI, AgenciesAPI } from '../gateway/agenciesapi/agencies-api'
import { AstronautsService } from '../modules/astronauts/astronauts-service'
import { HttpAstronautsAPI, AstronautsAPI } from '../gateway/astronautsapi/astronauts-api'
import { AxiosHttpService, HttpService } from './http'
require('dotenv').config()

export let astronautsService: AstronautsService
export let agenciesService: AgenciesService

export const createServices = () => {

   const baseUrl: any = process.env.BASE_URL

   const AgenciesApiHttp: HttpService = new AxiosHttpService(baseUrl)
   const agenciessAPI: AgenciesAPI = new HttpAgenciesAPI(AgenciesApiHttp)
   agenciesService = new AgenciesService(agenciessAPI)

   const AstronautsApiHttp: HttpService = new AxiosHttpService(baseUrl)
   const astronautsAPI: AstronautsAPI = new HttpAstronautsAPI(AstronautsApiHttp)
   astronautsService = new AstronautsService(astronautsAPI)
}