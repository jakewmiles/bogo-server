const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typedefs/schema.ts')
const resolvers = require('./resolvers/index.ts')
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(process.env.PORT).then(() => {
  console.log(`🚀 Server ready at ${process.env.PORT}`);
})
