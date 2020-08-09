const { GraphQLSchema } = require("graphql");
const { RootQuery } = require("./Query/Query");
const { Mutation } = require("./Mutation/Mutation");

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
module.exports = schema;
