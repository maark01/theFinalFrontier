import express, { json } from 'express'
import {astronautsRouter} from './astronauts'
import {agenciesRouter} from './agencies'
import {launchesRouter} from './launches'


const server: express.Application = express()

server.use(json())

server.use('/api/astronauts', astronautsRouter)
server.use('/api/agencies', agenciesRouter)
server.use('/api/launches', launchesRouter)

export default server