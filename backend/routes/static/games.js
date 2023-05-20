const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.get("/:table_id", async (request, response) => {
  const { id: user_id } = request.session.user;
  const { table_id } = request.params;

  // if(Games.full(table_id)){
  //   Games.drawCards(table_id);
  // }
  // TODO Send game state to user
  response.render("table", {
    table_id,
    user_id,
    title: `Table ${table_id}`,
    tablePlayers: await Games.getPlayersList(table_id),
  });
});

module.exports = router;
