import { Router } from 'express'

import health from './health'
import forms from './forms'

const routes = Router()

routes.use(health)
routes.use(forms)

export default routes
