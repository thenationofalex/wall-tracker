import * as Mongoose from 'mongoose'
import * as shortid from 'shortid'

import { Config } from '../../config'
import * as BetaModel from '../beta'
import { IAddImage, ISessionSchema } from './interface'

const SessionSchema = new Mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  deviceId: String,
  endedAt: String,
  feeling: String,
  gym: String,
  image: { type: String, default: Config.resources.image }
}, { timestamps: true })

export const fetchSessions = async (deviceId: string) => {
  return SessionModel
    .find({
      deviceId,
      endedAt : { $exists: true }
    })
    .sort({ createdAt: -1 })
    .exec()
}

export const fetchActiveSession = async (deviceId: string) => {
  return SessionModel.findOne({
    deviceId,
    endedAt: null
  })
}

export const findGyms = async () => {
  const gymList = []
  const gyms = await SessionModel
    .distinct('gym')
    .exec()
  gyms.forEach((gym) => {
    gymList.push({ name: gym })
  })
  return gymList
}

export const createSession = async (payload: ISessionSchema) => {
  return SessionModel
    .create(payload)
}

export const endSession = async (id: string) => {
  return SessionModel.findOneAndUpdate(
    { _id: id },
    { $set: {
        endedAt: Date.now()
      }
    },
    { new: true }
  ).exec()
}

export const deleteSession = async (id: string) => {
  BetaModel.deleteAllSessionBeta(id)
  return SessionModel.findByIdAndDelete(id)
}

export const addImageToSession = async (payload: IAddImage) => {
  const { id, image } = payload

  return SessionModel.findOneAndUpdate(
    { _id: id },
    { $set: {
        image
      }
    },
    {
      new: true,
      upsert: true
    }
  ).exec()
}

export const SessionModel = Mongoose.model<ISessionSchema>('Sessions', SessionSchema, 'Sessions')
