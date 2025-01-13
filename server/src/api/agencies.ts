import express, { Request, Response } from 'express'
import { Agency, Results } from '../modules/agency/model'
import { agencyService } from '../services/index'
import { API } from './model'


export const agenciesRouter = express.Router()

type GetAllAgenciesFromApiRequest = Request<never, Results | API.Agency.WithError, never, never>

agenciesRouter.get('/', async (req: GetAllAgenciesFromApiRequest, res: Response<Results | API.Agency.WithError>) => {
    agencyService.getAllAgenciesFromAPI()
        .then(agency => {
            res.status(200).send({ results: agency })
        })
        .catch(error => {
            if (error) res.status(500).send({ error: error.message })
        })
})

type GetAllAgenciesRequest = Request<never, Agency[] | API.Agency.WithError, never, never>

agenciesRouter.get('/db', async (req: GetAllAgenciesRequest, res: Response<Agency[] | API.Agency.WithError>) => {
    agencyService.getAllAgencies()
        .then((agency: Agency[]) => {
            res.status(200).send(agency)
        })
        .catch(error => {
            if (error) res.status(500).send({ error: error.message })
        })
})