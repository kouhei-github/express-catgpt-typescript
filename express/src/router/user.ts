import { Router } from 'express'
import {deleteUserHandler, getAllUsersHandler, updateUserHandler} from '../controllers/users'
import {isAuthenticatedHandler, isOwnerHandler} from '../middlewares'

export default (router: Router) => {
  router.get("/v1/users", isAuthenticatedHandler, getAllUsersHandler)
  router.delete("/v1/users/:userId", isAuthenticatedHandler, isOwnerHandler, deleteUserHandler)
  router.put("/v1/users/:userId", isAuthenticatedHandler, isOwnerHandler, updateUserHandler)
}
