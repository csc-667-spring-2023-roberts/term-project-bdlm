const express = require("express");
const Games = require("../../db/games.js");

const router = express.Router();



router.get("/:table_id", async (request, response) => {
  const { id: user_id } = request.session.user;
  const { table_id } = request.params;

  // Assumption that when game is full, game will start
  try {
    const  full  = await Games.full(table_id);

    if(full){
      let cards = await Games.drawCards(table_id, 2);
      console.log(cards);
      // .then((result)=> {
      //   console.log("--- RESULT --- ");
      //   console.log(result);
      // })
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
