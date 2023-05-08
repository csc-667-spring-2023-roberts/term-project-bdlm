const express = require("express");
//const { isAuthenticated } = require("../../middleware/is-authenticated.js");

const router = express.Router();
//
router.get("/lobby", (rep, res) => {
  res.render("lobby", { title: "LOBBY" });
});

module.exports = router;
