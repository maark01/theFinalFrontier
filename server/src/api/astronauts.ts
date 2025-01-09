import express, { Request, Response } from 'express'
import { astronautService } from '../services/index'
import { AstronautWithStatusAgencyImage, Results } from '../modules/astronaut/model'
import { API } from './model'

export const astronautsRouter = express.Router()

type GetAllAstronautsFromApiRequest = Request<never, Results | API.Astronaut.WithError, never, never>

astronautsRouter.get('/', async (req: GetAllAstronautsFromApiRequest, res: Response<Results | API.Astronaut.WithError>) => {
    astronautService.getAllAstronautsFromAPI()
        .then(astronauts => {
            res.status(200).send({ results: astronauts })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})

type GetAllAstronautsRequest = Request<never, AstronautWithStatusAgencyImage[] | API.Astronaut.WithError, never, never>

astronautsRouter.get('/db', async (req: GetAllAstronautsRequest, res: Response<AstronautWithStatusAgencyImage[] | API.Astronaut.WithError>) => {
    astronautService.getAllAstronauts()
        .then((astronaut: AstronautWithStatusAgencyImage[]) => {
            res.status(200).send(astronaut)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})