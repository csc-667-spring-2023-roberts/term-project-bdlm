const express = require("express");
const Games = require("../../db/games.js");
const User = require("../../db/users.js");
const { GAME_UPDATED } = require("../../../shared/constants.js");

const router = express.Router();

router.get("/:table_id", async (request, response) => {
  const { id: user_id } = request.session.user;
  const { table_id } = request.params;
  const io = request.app.get("io");
  
  try {
    const fullStatus = await Games.full(table_id);
    
    if(fullStatus){
      await Games.startGame(table_id);
      const length = await Games.getCommCardsLength(table_id);
      console.log(length);
    }
    

    
    

    // TODO Send game state to user
    response.render("table", {
      table_id,
      user_id,
      title: `Table ${table_id}`,
      tablePlayers: await Games.getPlayersList(table_id),
    });
  } catch(error){
    console.log(error);

    response.render("table",{
      table_id,
      user_id,
      title: `Errpr`,
      tablePlayers: [],
    });
  }
  
});

module.exports = router;
