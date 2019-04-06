import * as SessionModel from '../../models/session'

export const resolvers = {
  Mutation: {
    addSession: async (root, args, ctx) => {
      try {
        return await SessionModel.createSession(args)
      } catch (e) {
        throw new Error(e)
      }
    },
    deleteSession: async (root, args, ctx) => {
      try {
        const del = await SessionModel.deleteSession(args.id)
        if (del) { return { success: true } }
        return { success: false }
      } catch (e) {
        throw new Error(e)
      }
    },
    endSession: async (root, args, ctx) => {
      try {
        return await SessionModel.endSession(args.id)
      } catch (e) {
        throw new Error(e)
      }
    },
  },
  Query: {
    activeSession: async (root, args, ctx) => {
      try {
        return await SessionModel.fetchActiveSession(args.deviceId)
      } catch (e) {
        throw new Error(e)
      }
    },
    allSessions: async (root, args, ctx) => {
      try {
        return await SessionModel.fetchSessions(args.deviceId)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
