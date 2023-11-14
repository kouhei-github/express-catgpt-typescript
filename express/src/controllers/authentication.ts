import { Request, Response } from 'express'
import {createUser, getUserByEmail} from '../db/users'
import {authentication, random} from '../services/authentication'
import * as process from 'process'


export const loginHandler = async (req: Request, res: Response) => {
  const {email, password} = req.body
  if (!email || !password){
    return res.status(400).json({message: "必須呼応目が入力されていません"}).end()
  }

  const user = await getUserByEmail(email).select("+authentication.salt +authentication.password")

  if(!user){
    return res.status(400).json({message: "Emailが存在しません"}).end()
  }

  const expectedHash = authentication(user.authentication.salt, password)

  if (user.authentication.password !== expectedHash){
    return res.status(403).json({message: "メールアドレスとパスワードが正しくありません"}).end()
  }

  const salt = random()
  user.authentication.sessionToken = authentication(salt, user._id.toString())

  await user.save()

  res.cookie(
      "RULE-THE-FATE-AUTH",
      user.authentication.sessionToken,
      {domain: process.env.DOMAIN, path: "/", }
  )

  return res.status(200).json(user).end()
}


export const registerHandler = async (req: Request, res: Response) => {
  try{
    const { email, password, username } = req.body
    if(!email || !password || !username){
      return res.status(400).json({message: "必須呼応目が入力されていません"}).end()
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser){
      const message = "Email is already exist."
      return res.status(400).json({message}).end()
    }

    const salt = random()
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    })

    return res.status(201).json(user).end()
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: e.message}).end()
  }
}
