import 'dotenv/config'
import 'newrelic'
import './telegram'
import './jobs'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes'
import { logger } from './services'

const app = express()
const port = process.env.PORT || 3003

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(routes)

app.listen(port, () => logger.info(`App listen on port ${port}`))
