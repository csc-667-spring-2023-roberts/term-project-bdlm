const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");
const Games = require("../../db/games.js");

const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;

  response.render("lobby", {
    title: "LOBBY",
    available_tables: await Games.availableGames(user_id),
  });
});

module.exports = router;
