import * as Mongoose from 'mongoose'

export interface IBetaSchema extends Mongoose.Document {
  createdAt: Date,
  color: string,
  completed: boolean,
  grade: number,
  image: Array<string>,
  timeTaken: number,
  name: string,
  notes: string,
  sessionId: string
}
