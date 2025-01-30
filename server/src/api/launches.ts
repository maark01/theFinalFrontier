import express, { Request, Response } from 'express'
import { Results } from '../modules/launch/model'
import { API } from './model'


export const launchesRouter = express.Router()

type GetLaunchesFromApiRequest = Request<never, Results | API.Launch.WithError, never, never>

launchesRouter.get('/', async (req: GetLaunchesFromApiRequest, res: Response<Results | API.Launch.WithError>) => {
    
})
