import { AgencyService } from '../modules/agency/agency-service'
import { AstronautService } from '../modules/astronaut/astronaut-service'
import { HttpSpaceDevsAPI, SpaceDevsAPI } from '../gateway/space_devs/space_devs-api'
import { AxiosHttpService, HttpService } from './http'
import { AstronautMutation, PgAstronautMutation } from '../modules/astronaut/astronaut-mutation'
import { AstronautQuery, SqlAstronautQuery } from '../modules/astronaut/astronaut-query'
import { ImageMutation, PgImageMutation } from '../modules/image/image-mutation'
import { StatusMutation, PgStatusMutation } from '../modules/status/status-mutation'
import db from '../db/db-config'
require('dotenv').config()

export let astronautService: AstronautService
export let agencyService: AgencyService

export const createServices = () => {

   const baseUrl: any = process.env.BASE_URL

   const SpaceDevsAPIHttp: HttpService = new AxiosHttpService(baseUrl)
   const spaceDevsAPI: SpaceDevsAPI = new HttpSpaceDevsAPI(SpaceDevsAPIHttp)
   
   const astronautMutation: AstronautMutation = new PgAstronautMutation(db)
   const astronautQuery: AstronautQuery = new SqlAstronautQuery(db)
   
   const imageMutation: ImageMutation = new PgImageMutation(db)

   const statusMutation: StatusMutation = new PgStatusMutation(db)
   
   astronautService = new AstronautService(spaceDevsAPI, astronautMutation, astronautQuery, imageMutation, statusMutation)
   
   agencyService = new AgencyService(spaceDevsAPI)

}