/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, { models }) {
      models.Pet.findMany({ type: input.type });
    },
    pet(_, { input }, { models }) {
      models.Pet.findOne({ id: input.id })
    }
  }
}
