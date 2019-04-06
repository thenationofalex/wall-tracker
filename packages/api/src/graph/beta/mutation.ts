export const mutation = `
  addBeta (
    color: String,
    completed: Boolean,
    grade: Int,
    image: [String],
    name: String,
    notes: String,
    timeTaken: Int,
    sessionId: String
  ): Beta
  deleteBeta (
    id: ID
  ): BetaDelete
`
