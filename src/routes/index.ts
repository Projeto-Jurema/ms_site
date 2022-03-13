import { Router } from 'express'

import health from './health'
import forms from './forms'
import payment from './payment'
import animals from './animals'

const routes = Router()

routes.use(health)
routes.use(forms)
routes.use(payment)
routes.use(animals)

export default routes
