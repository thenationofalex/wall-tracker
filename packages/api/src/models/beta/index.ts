import * as Mongoose from 'mongoose'
import * as shortid from 'shortid'

import { addImageToSession } from '../session'
import { IBetaSchema } from './interface'

const BetaSchema = new Mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  color: String,
  completed: Boolean,
  grade: Number,
  image: [String],
  name: String,
  notes: String,
  sessionId: { type: String, ref: 'Sessions' },
  timeTaken: Number
}, { timestamps: true })

export const fetchAllBetaRecordsBySession = async (id: string) => {
  return BetaModel
    .find({ sessionId: id })
    .sort({ createdAt: -1 })
    .lean()
    .exec()
}

export const fetchBeta = async (id: string) => {
  return BetaModel
    .findById(id)
    .lean()
    .exec()
}

export const createBeta = async (payload: IBetaSchema) => {
  const { sessionId, image } = payload

  if (image) {
    addImageToSession({ id: sessionId, image: image[0] })
  }

  return BetaModel.create(payload)
}

export const deleteBeta = async (id: string) => {
  return BetaModel.findByIdAndDelete(id)
}

export const deleteAllSessionBeta = async (id: string) => {
  return BetaModel.deleteMany({ sessionId: id })
}

export const BetaModel = Mongoose.model<IBetaSchema>('Beta', BetaSchema, 'Beta')
