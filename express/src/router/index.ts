import { Router } from 'express'
import authentication from './authentication'
import user from './user'

const router = Router()

export default (): Router => {
  authentication(router)
  user(router)
  return router
}
