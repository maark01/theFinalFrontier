import { AstronautService } from '../modules/astronaut/astronaut-service'
import { AgencyService } from '../modules/agency/agency-service'
import { LaunchService } from '../modules/launch/launch-service'
import { HttpSpaceDevsAPI, SpaceDevsAPI } from '../gateway/space_devs/space_devs-api'
import { AddAstronautMixin, SqlAddAstronautMixin } from '../modules/astronaut/add-astronaut-mixin'
import { AddLaunchMixin, SqlAddLaunchMixin } from '../modules/launch/add-launch-mixin'
import { AstronautMutation, SqlAstronautMutation } from '../modules/astronaut/astronaut-mutation'
import { StatusMutation, SqlStatusMutation } from '../modules/status/status-mutation'
import { AddAgencyMixin, SqlAddAgencyMixin } from '../modules/agency/add-agency-mixin'
import { AgencyMutation, SqlAgencyMutation } from '../modules/agency/agency-mutation'
import { ImageMutation, SqlImageMutation } from '../modules/image/image-mutation'
import { LaunchMutation, SqlLaunchMutation } from '../modules/launch/launch-mutation'
import { MissionMutation, SqlMissionMutation } from '../modules/mission/mission-mutation'
import { AstronautQuery, SqlAstronautQuery } from '../modules/astronaut/astronaut-query'
import { AgencyQuery, SqlAgencyQuery } from '../modules/agency/agency-query'
import { LaunchQuery, SqlLaunchQuery } from '../modules/launch/launch-query'
import { AgencyParser, AstronautParser, EntityParser } from '../db/entity-parser/entity-parser'
import { Agency } from '../modules/agency/model'
import { AxiosHttpService, HttpService } from './http'
import { AstronautWithRelations } from '../modules/astronaut/model'
import { pg } from '../db/model'
import db from '../db/db-config'

require('dotenv').config()

export let astronautService: AstronautService
export let agencyService: AgencyService
export let launchService: LaunchService

export const createServices = () => {

   const baseUrl: any = process.env.BASE_URL

   applyMixins(SqlAddAstronautMixin, [SqlAstronautMutation, SqlStatusMutation, SqlImageMutation])
   applyMixins(SqlAddAgencyMixin, [SqlAgencyMutation])
   applyMixins(SqlAddLaunchMixin, [SqlLaunchMutation, SqlStatusMutation, SqlImageMutation, SqlMissionMutation])

   const SpaceDevsAPIHttp: HttpService = new AxiosHttpService(baseUrl)
   const spaceDevsAPI: SpaceDevsAPI = new HttpSpaceDevsAPI(SpaceDevsAPIHttp)

   const addAstronautMixin: AddAstronautMixin = new SqlAddAstronautMixin(db)
   const astronautMutation: AstronautMutation = new SqlAstronautMutation(db)
   //const astronautParser: EntityParser<pg.AstronautWithRelations, AstronautWithRelations> = new AstronautParser()
   const astronautQuery: AstronautQuery = new SqlAstronautQuery(db, /* astronautParser */)

   const statusMutation: StatusMutation = new SqlStatusMutation(db)

   const addAgencyMixin: AddAgencyMixin = new SqlAddAgencyMixin(db)
   const agencyMutation: AgencyMutation = new SqlAgencyMutation(db)
  // const agencyParser: EntityParser<pg.Agency, Agency> = new AgencyParser()
   const agencyQuery: AgencyQuery = new SqlAgencyQuery(db, /* agencyParser */)

   const addLaunchMixin: AddLaunchMixin = new SqlAddLaunchMixin(db)
   const launcMutation: LaunchMutation = new SqlLaunchMutation(db)
   const launchQuery: LaunchQuery = new SqlLaunchQuery(db)

   const imageMutation: ImageMutation = new SqlImageMutation(db)

   const missionMutation: MissionMutation = new SqlMissionMutation(db)

   astronautService = new AstronautService(spaceDevsAPI, addAstronautMixin, astronautQuery)
   agencyService = new AgencyService(spaceDevsAPI, addAgencyMixin, agencyQuery)
   launchService = new LaunchService(spaceDevsAPI, addLaunchMixin, launchQuery)
}

export function applyMixins(derivedCtor: any, constructors: any[]) {
   constructors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
         Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null))
      })
   })
}