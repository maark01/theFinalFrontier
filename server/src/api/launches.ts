import express, { Request, Response } from 'express'
import { Results } from '../modules/launch/model'
import { API } from './model'
import { launchService } from '../services'


export const launchesRouter = express.Router()

type GetLaunchesFromApiRequest = Request<never, Results | API.Launch.WithError, never, never>

launchesRouter.get('/', async (req: GetLaunchesFromApiRequest, res: Response<Results | API.Launch.WithError>) => {
    launchService.getLaunchesFromAPI()
        .then(launches => {
            if (launches !== undefined || null) {
                res.status(200).send({ results: launches })
            }
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        })
})
