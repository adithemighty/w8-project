const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const User = require("../models/User");

router.post("/new", (req, res) => {
  const { title, userId } = req.body;

  new Board({ title })
    .save()
    .then(newBoard => {
      User.findByIdAndUpdate(
        { _id: userId },
        { $push: { board: newBoard._id } },
        { new: true }
      ).then(user => {
        res.send(newBoard);
      });
    })
    .catch(err => {
      res.send({ error: err });
    });
});

router.post("/edit", (req, res) => {
  const { id } = req.body;
  //in case the title is a string with only whitespaces
  const title = req.body.title.trim();
  if (title) {
    //if there was a change, edit the field
    Board.findByIdAndUpdate({ _id: id }, { title }, { new: true })
      .then(updatedBoard => {
        res.send(updatedBoard);
      })
      .catch(err => {
        res.send({ error: "Edit: id doesn't exist" });
      });
  } else {
    Board.findById({ _id: id }).then(board => {
      //if nothing was changed just send the board
      res.send(board);
    });
  }
});

router.get("/data/all/:userId", (req, res) => {
  const { userId } = req.params;
  //browse view in which you see all exisiting boards
  User.findById({ _id: userId })
    .then(user => {
      res.send(user.board);
    })
    .catch(err => {
      res.send({ error: err });
    });
});

router.get("/data/:id", (req, res) => {
  const { id } = req.params;
  //browse view in which you see all exisiting boards
  Board.findById({ _id: id })
    .then(board => {
      res.send(board);
    })
    .catch(err => {
      res.send({ error: err });
    });
});

module.exports = router;
