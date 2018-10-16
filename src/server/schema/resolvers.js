const Board = require("../models/Board");
const Column = require("../models/Column");
const Ticket = require("../models/Ticket");

module.exports = {
  Query: {
    boards: () => {
      return Board.find({}).then(boards => {
        return boards;
      });
    }
  }
  //   Mutation: {
  //     addBoard: (root, args) => {
  //       return new Board({ title }).save().then(newBoard => newBoard);
  //     }
  //   }
};
