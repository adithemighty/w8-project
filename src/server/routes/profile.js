const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", (req, res) => {
  const { time, id } = req.body;
  User.findByIdAndUpdate({ _id: id }, { daily: time }, { new: true }).then(
    newUser => res.send(newUser)
  );
});

module.exports = router;
