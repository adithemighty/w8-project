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
    )
      .then(column => {
        res.send(column);
      })
      .catch(err => {
        res.send(err);
      });
  });
});

router.get("/show/:id", (req, res) => {
  const { id } = req.params;

  Ticket.findById({ _id: id })
    .then(ticket => {
      res.send(ticket);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;

  const { title, description, estimation, blocker, ticketType } = req.body;

  const updatedFields = {};

  if (typeof title !== "undefined") {
    updatedFields["title"] = title;
  }

  if (typeof description !== "undefined") {
    updatedFields["description"] = description;
  }

  if (typeof estimation !== "undefined") {
    updatedFields["estimation"] = Number(estimation);
  }

  if (typeof blocker !== "undefined") {
    updatedFields["blocker"] = blocker;
  }

  if (typeof ticketType !== "undefined") {
    updatedFields["ticketType"] = ticketType;
  }

  Ticket.findByIdAndUpdate({ _id: id }, updatedFields, { new: true })
    .then(ticket => {
      res.send(ticket);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;

  Column.findOneAndUpdate({ ticket: id }, { $pull: { ticket: id } })
    .then(column => {
      Ticket.findByIdAndRemove({ _id: id }).then(ticket => {
        res.send(ticket);
      });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
