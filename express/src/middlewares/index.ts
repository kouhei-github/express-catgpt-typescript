import {NextFunction, Request, Response} from 'express'
import {getUserBySessionToken} from '../db/users'
import {get, merge} from 'lodash'

export const isOwnerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { userId } = req.params
    const currentUserId = get(req, "identity._id") as string

    if(!currentUserId){
      return res.status(400).json({message: "userid is not equal"}).end()
    }

    if(currentUserId.toString() !== userId){
      const message = "Failed Authenticated"
      return res.status(403).json({message}).end()
    }

    return next()
  } catch (error) {
    return res.status(400).json({message: error.message}).end()
  }
}

export const isAuthenticatedHandler = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const sessionToken = req.cookies["RULE-THE-FATE-AUTH"]

    if(!sessionToken){
      return res.status(400).json({message: "session token is nothing"}).end()
    }

    const existingUser = await getUserBySessionToken(sessionToken)

    if (!existingUser){
      const message = "Failed Authenticated"
      return res.status(403).json({message}).end()
    }

    merge(req, { identity: existingUser })

    return next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: error.message}).end()
  }
}
