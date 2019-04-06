import * as BetaModel from '../../models/beta'

export const resolvers = {
  Mutation: {
    addBeta: async (root, args, ctx) => {
      try {
        return await BetaModel.createBeta(args)
      } catch (e) {
        throw new Error(e)
      }
    },
    deleteBeta: async (root, args, ctx) => {
      try {
        const del = await BetaModel.deleteBeta(args.id)
        if (del) {
          return { succces: true }
        }
        return { succces: false }
      } catch (e) {
        throw new Error(e)
      }
    }
  },
  Query: {
    allRecords: async (root, args, ctx) => {
      try {
        return await BetaModel.fetchAllBetaRecordsBySession(args.id)
      } catch (e) {
        throw new Error(e)
      }
    },
    singleRecord: async (root, args, ctx) => {
      try {
        return await BetaModel.fetchBeta(args.id)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
