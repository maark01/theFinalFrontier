import express, { Request, Response } from 'express'
import { astronautsService } from '../services/index'
import { Astronaut, Results } from '../modules/astronauts/model'
import { API } from './model'

export const astronautsRouter = express.Router()

type GetAllAstronautsFromApiRequest = Request<never, Results | API.Astronaut.WithError, never, never>

astronautsRouter.get('/', async (req: GetAllAstronautsFromApiRequest, res: Response<Results | API.Astronaut.WithError>) => {
    astronautsService.getAllAstronautsFromAPI()
        .then(astronauts => {
            res.status(200).send({ results: astronauts })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})

type GetAllAstronautsFromDbRequest = Request<never, Astronaut[] | API.Astronaut.WithError, never, never>


astronautsRouter.get('/db', async (req: GetAllAstronautsFromDbRequest, res: Response<Astronaut[] | API.Astronaut.WithError>) => {
    astronautsService.getAllAstronautsFromDatabase()
        .then(astronauts => {
            res.status(200).send(astronauts)
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})