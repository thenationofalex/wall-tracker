import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import BetaSchema from './beta'
import SessionSchema from './session'

const Query = `
  type Query {
    ${BetaSchema.query}
    ${SessionSchema.query}
  },
  type Mutation {
    ${BetaSchema.mutation}
    ${SessionSchema.mutation}
  }
`

const schema = makeExecutableSchema({
  resolvers: merge(
    BetaSchema.resolvers,
    SessionSchema.resolvers
  ),
  typeDefs: [
    Query,
    BetaSchema.typeDefs,
    SessionSchema.typeDefs
  ]
})

export default schema
