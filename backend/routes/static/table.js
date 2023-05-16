const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");
const Games = require("../../db/games.js");

const router = express.Router();

//need table id separate from other id
router.get("/:id", async (_request, response) => {
  const { id } = _request.params;

  response.render("table", {
    id,
    title: `Table ${id}`,
    tablePlayers: await Games.getPlayersList(id),
  });
});

module.exports = router;
