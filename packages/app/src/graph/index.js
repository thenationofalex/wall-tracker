import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

import { Config } from '../config'

const cache = new InMemoryCache()

export const ApiClient = new ApolloClient({
  cache,
  link: createUploadLink({
    uri: Config.apiEndpoint
  })
})
