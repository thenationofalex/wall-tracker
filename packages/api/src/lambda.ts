import { ApolloServer } from 'apollo-server-lambda'
import * as depthLimit from 'graphql-depth-limit'
import schema from './graph'
import { connectToMongo } from './models'

const { env } = process

const startCore = async () => {
  await connectToMongo()
}

startCore()

const server = new ApolloServer({
  context: ({ event, context }) => ({
    context,
    event,
    functionName: context.functionName,
    headers: event.headers
  }),
  introspection: env.NODE_ENV === 'local',
  playground: env.NODE_ENV === 'local',
  schema,
  tracing: env.NODE_ENV === 'local',
  validationRules: [
    depthLimit(10)
  ]
})

exports.handler = server.createHandler({
  cors: {
    credentials: true,
    origin: '*'
  }
})
