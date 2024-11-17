import express, { json } from 'express'
import {astronautsRouter} from './astronauts'
import {agenciesRouter} from './agencies'


const server: express.Application = express()

server.use(json())

server.use('/astronauts', astronautsRouter)
server.use('/agencies', agenciesRouter)

export default server