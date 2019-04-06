import * as Mongoose from 'mongoose'

export interface ISessionSchema extends Mongoose.Document {
  createdAt: Date,
  deviceId: string,
  gym: string,
  feeling: string,
  image: string
}

export interface IAddImage {
  id: string,
  image: string
}
