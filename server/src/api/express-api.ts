import express, { json } from 'express'
import {astronautsRouter} from './astronauts'
import {agenciesRouter} from './agencies'


const server: express.Application = express()

server.use(json())

server.use('/api/astronauts', astronautsRouter)
server.use('/api/agencies', agenciesRouter)

export default server