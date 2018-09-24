const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Column = require("../models/Column");
const axios = require("axios");
const config = require("../config");

router.post("/new", (req, res) => {
  const { boardId, columnTitle: title } = req.body;
  //create the column
  Column.create({ title }).then(column => {
    //find the board it's on
    Board.findByIdAndUpdate(
      { _id: boardId },
      //add the id to the board
      { $push: { columns: column._id } },
      { new: true }
    ).then(board => {
      res.send(board);
    });
  });
});

router.post("/delete", (req, res) => {
  const { sourceColumnId, destinationColumnId, boardId } = req.body;
  let ticketsFromSource = [];

  //if there there were tickets in the source column
  //there will be a destination
  if (typeof destinationColumnId !== "undefined") {
    //find column by id
    Column.findById({ _id: sourceColumnId }).then(column => {
      //get all tickets from source
      ticketsFromSource = column.ticket.map(ticket => {
        return ticket._id;
      });
      Column.findByIdAndUpdate(
        { _id: destinationColumnId },
        //add them to the destination column
        { $push: { ticket: { $each: ticketsFromSource } } },
        { new: true }
      ).then(column => {
        Column.findByIdAndRemove({ _id: sourceColumnId }).then(() => {
          Board.findByIdAndUpdate(
            { _id: boardId },
            { $pull: { columns: sourceColumnId } },
            { safe: true }
          ).then(board => {
            res.send(board);
          });
        });
      });
    });
  } else {
    //there were no tickets in the source column
    Column.findByIdAndRemove({ _id: sourceColumnId }).then(column => {
      Board.findByIdAndUpdate(
        { _id: boardId },
        { $pull: { columns: sourceColumnId } },
        { safe: true }
      ).then(board => {
        res.send(board);
      });
    });
  }
});

router.post("/update", (req, res) => {
  let updatedFields = {};

  const { title, limit, order, tickets, id } = req.body;

  if (title) {
    updatedFields["title"] = title;
  }

  if (limit) {
    updatedFields["limit"] = limit;
  }

  if (tickets) {
    updatedFields["ticket"] = tickets.map(ticket => {
      return ticket._id;
    });
  }

  Column.findByIdAndUpdate(
    { _id: id },
    { $set: updatedFields },
    { new: true }
  ).then(updatedColumn => {
    res.send(updatedColumn);
  });
});

router.post("/gitTest", (req, res) => {
  console.log(process.env.GIT_TOKEN);
  axios
    .post(
      "https://api.github.com/repos/adiyathemighty/w8-project/issues",
      { title: "title123" },

      {
        headers: {
          Authorization: `token ${config.GIT_TOKEN}`,
          Accept: "application/vnd.github.symmetra-preview+json",
          "Content-Type": "application/json"
        }
      }
    )
    .then(result => {
      res.send(result);
    })
    .catch(err => res.send(err));
});

module.exports = router;
