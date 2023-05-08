const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");

const router = express.Router();
//
router.get("/", (_request, response) => {
  response.render("lobby", { title: "LOBBY" });
});

module.exports = router;
