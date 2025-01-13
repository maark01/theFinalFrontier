import server from './src/api/express-api'
import { createServices } from './src/services'
require('dotenv').config()

const port = process.env.PORT

createServices()

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
