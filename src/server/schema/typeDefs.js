const { gql } = require("apollo-server");

const typeDefs = gql`
  type Board {
    id: String
    title: String
    columns: [Column]!
  }

  type Column {
    id: String
    title: String
    limit: Int
    order: Int
    ticket: [Ticket]
  }

  type Ticket {
    id: String
    title: String
    description: String
    estimation: Int
    ticketType: String
  }

  # This type specifies the entry points into our API.
  type Query {
    boards: [Board] # "[]" means this is a list of channels
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    # A mutation to add a new channel to the list of channels
    addBoard(title: String!): Board
  }
`;

module.exports = typeDefs;
