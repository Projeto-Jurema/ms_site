import { Router } from 'express'

import health from './health'
import forms from './forms'
import payment from './payment'

const routes = Router()

routes.use(health)
routes.use(forms)
routes.use(payment)

export default routes
