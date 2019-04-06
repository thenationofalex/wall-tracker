export const mutation = `
  addSession (
    gym: String,
    feeling: String,
    deviceId: String
  ): Sessions
  endSession (
    id: ID
  ): Sessions
  deleteSession (
    id: ID
  ): SessionDelete
`
