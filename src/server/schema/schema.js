const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = graphql;

const BoardType = GraphQLObjectType({
  name: "Board",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    columns: { type: GraphQLList }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    board: {
      type: BoardType,
      //we expect arguments
      //so here we define the argument id so that we can search for the id from the DB
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        //code to get data from DB
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
