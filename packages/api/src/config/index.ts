import * as dotenv from 'dotenv'

const { env } = process

dotenv.config()

export const Config = {
  database: {
    host: env.DB_HOST,
    name: env.DB_NAME,
    password: env.DB_PASS,
    port: 27017,
    type: 'mongodb',
    username: env.DB_USER
  },
  resources: {
    image: 'https://via.placeholder.com/400'
  },
  server: {
    host: '0.0.0.0',
    port: 8888
  }
}
