const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");
const Games = require("../../db/games.js");

const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;
  console.log("*** / in the lobby.js");
  response.render("lobby", {
    title: "LOBBjkhxvjY",
    available_tables: await Games.availableGames(user_id),
  });
});

module.exports = router;

/**<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <!-- Res */