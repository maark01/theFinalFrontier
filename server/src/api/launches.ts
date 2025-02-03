import express, { Request, Response } from 'express'
import { LaunchWithRelations, Results } from '../modules/launch/model'
import { launchService } from '../services'
import { API } from './model'


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
            res.status(500).send({ error: error.message })
        })
})

type GetLaunchesRequest = Request<never, LaunchWithRelations[] | API.Launch.WithError, never, API.Launch.WithSearch>


launchesRouter.get('/db', async (req: GetLaunchesRequest, res: Response<LaunchWithRelations[] | API.Astronaut.WithError>) => {
    const search = req.query.search ?? undefined

    launchService.getLaunches(search)
        .then((launch: LaunchWithRelations[]) => {
            if (launch !== undefined || null) {
                return res.status(200).send(launch)
            }
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})