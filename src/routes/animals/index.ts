import { Router } from 'express'
import { Get } from '../../controllers'

const routes = Router()

routes.get('/animals', Get)

export default routes
