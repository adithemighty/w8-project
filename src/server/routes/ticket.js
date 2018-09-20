const express = require("express");
const router = express.Router();
const Column = require("../models/Column");
const Ticket = require("../models/Ticket");

router.post("/new", (req, res) => {
  const { title, description, estimation, columnId } = req.body;

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

router.get("/show/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  Ticket.findById({ _id: id })
    .then(ticket => {
      res.send(ticket);
    })
    .catch(err => {
      res.send(err);
    });
});

// router("/edit", (req, res) => {
//     const {title, }
// })

// router("/delete")

module.exports = router;
