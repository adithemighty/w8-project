const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

router.get("/", (req, res) => {
  res.send("Hello from board route");
});

router.post("/new", (req, res) => {
  new Board({}).save().then(newBoard => {
    console.log(newBoard);
    res.send(newBoard);
  });
});

module.exports = router;
