const express = require("express");
const router = express.Router();
const Column = require("../models/Column");
const Ticket = require("../models/Ticket");

router.post("/new", (req, res) => {
  const { title, blocker, description, estimation, columnId } = req.body;

  const newTicket = {};

  if (typeof title !== "undefined") {
    newTicket["title"] = title;
  }

  if (typeof description !== "undefined") {
    newTicket["description"] = description;
  }

  if (typeof estimation !== "undefined") {
    newTicket["estimation"] = estimation;
  }

  //TODO generate keys based on board
  Ticket.create(newTicket).then(ticket => {
    Column.findByIdAndUpdate(
      { _id: columnId },
      { $push: { ticket: ticket._id } },
      { new: true }
    ).then(column => {
      res.send(column);
    });
  });
});

module.exports = router;
