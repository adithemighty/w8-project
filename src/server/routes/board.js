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

//redirect to retromat
router.get("/retromat", (req, res) => {
  res.redirect("https://retromat.org/en");
});

router.post("/delete", (req, res) => {
  const { id } = req.body;

  Board.findByIdAndRemove({ _id: id }).then(() => res.send("board deleted"));
});

router.post("/edit", (req, res) => {
  const { id, dailyTime } = req.body;
  //in case the title is a string with only whitespaces
  let title = req.body.title;
  const updatedFields = {};

  if (title) {
    title = title.trim();
    updatedFields["title"] = title;
  }

  if (dailyTime) {
    updatedFields["dailyTime"] = dailyTime;
  }

  console.log(updatedFields, id);

  //if there was a change, edit the field
  Board.findByIdAndUpdate({ _id: id }, { $set: updatedFields }, { new: true })
    .then(updatedBoard => {
      console.log(updatedBoard);
      res.send(updatedBoard);
    })
    .catch(err => {
      res.send({ error: "Edit: id doesn't exist" });
    });
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

router.post("/updateColumns", (req, res) => {
  const { columnIds, boardId } = req.body;

  Board.findByIdAndUpdate(
    { _id: boardId },
    { $set: { columns: columnIds } },
    { new: true }
  ).then(updatedBoard => {
    res.send(updatedBoard);
  });
});

module.exports = router;
