export const typeDefs = `
  type Sessions {
    _id: ID,
    gym: String,
    deviceId: String,
    feeling: String,
    createdAt: String,
    endedAt: String,
    image: String
  }
  type SessionDelete {
    success: Boolean
  }
`
