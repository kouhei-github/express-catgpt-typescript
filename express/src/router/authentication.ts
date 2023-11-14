import { Router } from 'express'
import {loginHandler, registerHandler} from '../controllers/authentication'

export default (router: Router) => {
  router.post("/v1/auth/register", registerHandler)
  router.post("/v1/login", loginHandler)
}
