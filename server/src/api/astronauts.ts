import express, { Request, Response } from 'express'
import { astronautService } from '../services/index'
import { Astronaut, Results } from '../modules/astronaut/model'
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

type GetAllAstronautsRequest = Request<never, Astronaut[] | API.Astronaut.WithError, never, never>


astronautsRouter.get('/db', async (req: GetAllAstronautsRequest, res: Response<Astronaut[] | API.Astronaut.WithError>) => {
    astronautService.getAllAstronauts()
        .then(astronauts => {
            res.status(200).send(astronauts)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})