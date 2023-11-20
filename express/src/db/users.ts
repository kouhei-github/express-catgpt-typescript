import mongoose, { Document } from 'mongoose'


export interface  IUser extends Document {
  username: string
  email: string
  authentication: {
    password: string
    salt: string
    sessionToken: string
  }
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: {type: String, required: true, select: false},
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false}
  }
})


export const UserModel = mongoose.model<IUser>("User", UserSchema)

export const getUsers = async (): Promise<IUser[] | null> => await UserModel.find()
export const getUserByEmail =　async (email:string): Promise<IUser | null> => await UserModel.findOne({email})
export const getUserBySessionToken = async (sessionToken: string): Promise<IUser | null> => await UserModel.findOne({
  "authentication.sessionToken": sessionToken
})
export const getUserById = async (id: string): Promise<IUser | null> => await UserModel.findById(id)
export const createUser = async (values: Record<string, any>): Promise<IUser | null> => await new UserModel(values).save().then((user) => user.toObject())
export const deleteUserById =　async (id: string): Promise<IUser | null> =>　await UserModel.findOneAndDelete({_id: id})
export const updateUserById =　async (id: string, values: Record<string, any>): Promise<IUser | null> =>　await UserModel.findByIdAndUpdate(id, values)
