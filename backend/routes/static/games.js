const express = require("express");
const Games = require("../../db/games");

const router = express.Router();



router.get("/:table_id", async (request, response) => {
  const { id: user_id } = request.session.user;
  const { table_id } = request.params;

  // Assumption that when game is full, game will start
  let { full } = await Games.full(table_id);
  console.log("Type for full: ", typeof full);
  console.log("FULL? : ", full);
  // if(full){
  //   Games.drawCards(table_id)
  //   .then((result)=> {
  //     console.log("--- RESULT --- ");
  //     console.log(result);
  //   })
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
