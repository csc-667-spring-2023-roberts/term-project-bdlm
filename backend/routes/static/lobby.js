const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");
const Games = require("../../db/games.js");

const router = express.Router();

router.get("/", async (_request, response) => {
  response.render("lobby", {
    title: "LOBBY",
    table_types: await Games.tableTypes(),
  });
});

module.exports = router;
