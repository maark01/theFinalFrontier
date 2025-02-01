import express, { Request, Response } from 'express'
import { astronautService } from '../services/index'
import { AstronautWithRelations, Results } from '../modules/astronaut/model'
import { API } from './model'

export const astronautsRouter = express.Router()

type GetAstronautsFromApiRequest = Request<never, Results | API.Astronaut.WithError, never, never>

astronautsRouter.get('/', async (req: GetAstronautsFromApiRequest, res: Response<Results | API.Astronaut.WithError>) => {
    astronautService.getAstronautsFromAPI()
        .then(astronauts => {
            if (astronauts !== undefined || null) {
                res.status(200).send({ results: astronauts })
            }
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})

type GetAstronautsRequest = Request<never, AstronautWithRelations[] | API.Astronaut.WithError, never, API.Astronaut.WithSearch>

astronautsRouter.get('/db', async (req: GetAstronautsRequest, res: Response<AstronautWithRelations[] | API.Astronaut.WithError>) => {
    const search = req.query.search ?? undefined

    astronautService.getAstronauts(search)
        .then((astronaut: AstronautWithRelations[]) => {
            if (astronaut !== undefined || null) {
                return res.status(200).send(astronaut)
            }
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})