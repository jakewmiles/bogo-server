/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {

    user(_, { input }, { test }) {
      return 1;

    }
  },
  Mutation: {

  }
}
