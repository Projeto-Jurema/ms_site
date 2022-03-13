import { Router } from 'express'
import { Post } from '../../controllers'

const routes = Router()

routes.post('/forms', Post)

export default routes
