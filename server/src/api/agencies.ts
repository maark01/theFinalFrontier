import express, { Request, Response } from 'express'
import { Agency } from '../modules/agencies/model'
import { agenciesService } from '../services/index'
import { API } from './model'


export const agenciesRouter = express.Router()

type GetAllAgenciesRequest = Request<never, Agency[] | API.Agency.WithError, never, never>

agenciesRouter.get('/', async (req: GetAllAgenciesRequest, res: Response<Agency[] | API.Agency.WithError>) => {

/*     agenciesService.getAllAgencies()
    .then(agency => {
        console.log(agency)
        res.status(200).send(agency)
    })
    .catch(error => {
        if (error) res.status(500).send({ error: error.message })
    }) */
})