var ApolloServer = require('apollo-server').ApolloServer;
var typeDefs = require('./typedefs/schema.ts');
var resolvers = require('./resolvers/index.ts');
var db = require('./models/index.ts');
var sequelize = require('./models/index.ts').sequelize;
require('dotenv').config();
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function () {
        return { db: db };
    }
});
sequelize.sync().then(function () {
    server.listen(process.env.PORT).then(function () {
        console.log("\uD83D\uDE80 Server ready at " + process.env.PORT);
    });
});
