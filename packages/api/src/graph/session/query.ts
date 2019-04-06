export const query = `
  activeSession(deviceId: String!): Sessions
  allSessions(deviceId: String!): [Sessions]
`
