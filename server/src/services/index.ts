import { AgenciesService } from '../modules/agencies/agencies-service'
import { HttpAgenciesAPI, AgenciesAPI } from '../gateway/agenciesapi/agencies-api'
import { AstronautsService } from '../modules/astronauts/astronauts-service'
import { HttpAstronautsAPI, AstronautsAPI } from '../gateway/astronautsapi/astronauts-api'
import { AxiosHttpService, HttpService } from './http'
import { AstronautsMutation, PgAstronautsMutation } from '../modules/astronauts/astronauts-mutation'
import db from '../db/db-config'
import { AstronautsQuery, SqlAstronautsQuery } from '../modules/astronauts/astronauts-query'
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
   const astronautsMutation: AstronautsMutation = new PgAstronautsMutation(db)
   const astronautsQuery: AstronautsQuery = new SqlAstronautsQuery(db)
   astronautsService = new AstronautsService(astronautsAPI, astronautsMutation, astronautsQuery)
}