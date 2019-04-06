import * as Mongoose from 'mongoose'
import { Config } from '../config'

const { env } = process

export const connectToMongo = async () => {
  if (env.NODE_ENV === 'local') {
    Mongoose.connect(`mongodb://127.0.0.1:27017/${Config.database.name}`)
  } else {
    Mongoose.connect(
      `mongodb+srv://${Config.database.username}:${Config.database.password}@${
        Config.database.host
      }/${Config.database.name}?retryWrites=true`,
      {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useCreateIndex: false,
        useNewUrlParser: true,
      }
    )
  }

  return new Promise((resolve, reject) => {
    Mongoose.connection.on('error', (e) => {
      console.error(`🔥 FAILED to connect to mongodb`, e)
      reject(e)
    })
    Mongoose.connection.on('close', () => {
      console.info(`🐢 Connection closed for API to ${Config.database.host}`)
    })
    Mongoose.connection.on('reconnected', () => {
      console.info(`🐢 Reconnected API to ${Config.database.host}`)
    })
    Mongoose.connection.on('disconnected', () => {
      console.info(`🐢 Disconnected API from ${Config.database.host}`)
    })
    Mongoose.connection.on('open', () => {
      console.info(`🐢 Connected to mongodb at ${Config.database.host}`)
      resolve()
    })
  })
}
