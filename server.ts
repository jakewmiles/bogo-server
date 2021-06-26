const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typedefs/schema.ts')
const resolvers = require('./resolvers/index.ts')
// const db = require('./models/index.ts');
require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { test: 'ehllo' }
  }
})

server.listen(process.env.PORT).then(() => {
  console.log(`🚀 Server ready at ${process.env.PORT}`);
})
