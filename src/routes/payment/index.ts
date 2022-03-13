import { Router } from 'express'
import { Post } from '../../controllers/payment'

const routes = Router()

routes.post('/pix', Post)

export default routes
