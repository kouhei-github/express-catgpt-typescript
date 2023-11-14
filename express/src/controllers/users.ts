import {Request, Response} from 'express'
import {deleteUserById, getUserById, getUsers, updateUserById} from '../db/users'
import {authentication, random} from '../services/authentication'

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try{
    const users = await getUsers()

    return res.status(200).json(users).end()

  } catch (e) {
    console.log(e)
    return res.status(400).json({message: e.message}).end()
  }
}


export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const existingUser = await getUserById(userId)

    if (!existingUser){
      const message = "Failed Authenticated"
      return res.status(403).json({message}).end()
    }

    const deleteUser = await deleteUserById(userId)

    return res.status(200).json(deleteUser).end()

  } catch (e) {
    return res.status(400).json({message: e.message}).end()
  }
}


export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const { username, email, password } = req.body

    const existingUser = await getUserById(userId)

    if (!existingUser){
      const message = "Failed Authenticated"
      return res.status(403).json({message}).end()
    }

    const salt = random()

    const updateUser = await updateUserById(userId, {
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    })

    return res.status(201).json(updateUser).end()
  } catch (e) {
    const message = e.message
    return res.status(400).json({message}).end()
  }
}
