const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.get("/:table_id", async (request, response) => {
  const { id: user_id } = request.session.user;
  const { table_id } = request.params;

  // TODO Send game state to user
  response.render("tableroom", {
    table_id,
    user_id,
    title: `Table ${table_id}`,
    available_tables: await Games.availableGames(user_id),
  });
});

module.exports = router;
