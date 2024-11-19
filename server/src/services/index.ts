import { AgenciesService } from '../modules/agencies/agencies-service'
import { AstronautsService } from '../modules/astronauts/astronauts-service'
import { HttpSpaceDevsAPI, SpaceDevsAPI } from '../gateway/space_devs/space_devs-api'
import { AxiosHttpService, HttpService } from './http'
import { AstronautsMutation, PgAstronautsMutation } from '../modules/astronauts/astronauts-mutation'
import db from '../db/db-config'
import { AstronautsQuery, SqlAstronautsQuery } from '../modules/astronauts/astronauts-query'
require('dotenv').config()

export let astronautsService: AstronautsService
export let agenciesService: AgenciesService

export const createServices = () => {

   const baseUrl: any = process.env.BASE_URL

   const SpaceDevsAPIHttp: HttpService = new AxiosHttpService(baseUrl)
   const spaceDevsAPI: SpaceDevsAPI = new HttpSpaceDevsAPI(SpaceDevsAPIHttp)
   const astronautsMutation: AstronautsMutation = new PgAstronautsMutation(db)
   const astronautsQuery: AstronautsQuery = new SqlAstronautsQuery(db)
   astronautsService = new AstronautsService(spaceDevsAPI, astronautsMutation, astronautsQuery)
   
   agenciesService = new AgenciesService(spaceDevsAPI)
}