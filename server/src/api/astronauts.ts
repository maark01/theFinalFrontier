import express, { Request, Response } from 'express'
import { astronautsService } from '../services/index'
import { API } from './model'

export const astronautsRouter = express.Router()

type GetAllAstronautsRequest = Request<never, API.Astronaut.Results | API.Astronaut.WithError, never, never>

astronautsRouter.get('/', (req: GetAllAstronautsRequest, res: Response<API.Astronaut.Results | API.Astronaut.WithError>) => {
    astronautsService.getAllAstronauts()
        .then(astronauts => {
            res.status(200).send({ results: astronauts }) 
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
})
