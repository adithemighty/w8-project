const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Column = require("../models/Column");

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

// await Column.findByIdAndUpdate(
//     { _id: columnId1 },
//     { $push: { ticket: { $each: allTicketIds } } }
//   );

module.exports = router;
