export const typeDefs = `
   type Beta {
    "Climb"
    _id: ID,
    color: String,
    completed: Boolean,
    createdAt: String,
    grade: Int,
    image: [String],
    name: String,
    notes: String,
    timeTaken: Int,
    sessionId: String
  }
  type BetaDelete {
    success: Boolean
  }
`
