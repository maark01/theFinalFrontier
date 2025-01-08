import { AgencyService } from '../modules/agency/agency-service'
import { AstronautService } from '../modules/astronaut/astronaut-service'
import { HttpSpaceDevsAPI, SpaceDevsAPI } from '../gateway/space_devs/space_devs-api'
import { AxiosHttpService, HttpService } from './http'
import { AddAstronautMixin, SqlAddAstronautMixin } from '../modules/astronaut/add-astronaut-mixin'
import { AstronautMutation, SqlAstronautMutation } from '../modules/astronaut/astronaut-mutation'
import { AstronautQuery, SqlAstronautQuery } from '../modules/astronaut/astronaut-query'
import { StatusMutation, SqlStatusMutation } from '../modules/status/status-mutation'
import { AgencyMutation, SqlAgencyMutation } from '../modules/agency/agency-mutation'
import { ImageMutation, SqlImageMutation } from '../modules/image/image-mutation'
import { AstronautParser, EntityParser } from '../db/entity-parser/entity-parser'
import { AstronautWithStatusAgencyImage } from '../modules/astronaut/model'
import { pg } from '../db/model'
import db from '../db/db-config'

require('dotenv').config()

export let astronautService: AstronautService
export let agencyService: AgencyService

export const createServices = () => {

   const baseUrl: any = process.env.BASE_URL

   applyMixins(SqlAddAstronautMixin, [SqlAstronautMutation, SqlStatusMutation, SqlAgencyMutation, SqlImageMutation])

   const SpaceDevsAPIHttp: HttpService = new AxiosHttpService(baseUrl)
   const spaceDevsAPI: SpaceDevsAPI = new HttpSpaceDevsAPI(SpaceDevsAPIHttp)

   const addAstronautMixin: AddAstronautMixin = new SqlAddAstronautMixin(db)
   const astronautMutation: AstronautMutation = new SqlAstronautMutation(db)

   const astronautParser: EntityParser<pg.AstronautWithStatusAgencyImage, AstronautWithStatusAgencyImage> = new AstronautParser()
   const astronautQuery: AstronautQuery = new SqlAstronautQuery(db, astronautParser)

   const statusMutation: StatusMutation = new SqlStatusMutation(db)

   const agencyMutation: AgencyMutation = new SqlAgencyMutation(db)

   const imageMutation: ImageMutation = new SqlImageMutation(db)

   astronautService = new AstronautService(spaceDevsAPI, addAstronautMixin, astronautQuery)

   agencyService = new AgencyService(spaceDevsAPI)
}

export function applyMixins(derivedCtor: any, constructors: any[]) {
   constructors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
         Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null))
      })
   })
}