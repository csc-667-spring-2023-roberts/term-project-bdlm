const express = require("express");
const Games = require("../../db/games");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");

const router = express.Router();

<<<<<<< HEAD
router.post("/create", async (request, response) => {
  const { id: user_id } = request.session.user;

  try {
    const { id: table_id } = await Games.createGameTable(user_id);
    response, redirect(`/games/${table_id}`);
  } catch (error) {
    console.log({ error });
    response.redirect("/lobby");
  }
});
router.get("/:id", (request, response) => {
  const { id } = request.params;
  response.render("games", { id, title: "BDLM Term Project" });
=======
router.get('/:match_type', async(request, response) => {
    const { match_type } = request.params;
    try {
        const { check } = await Games.checkRooms(match_type);
        if (check < 1) {
            console.log("Room does not exist. Creating new room .... ")
            const { room_id } = Games.createRoom(match_type);
            response.redirect(`/games/${room_id}`);
        }
        else{
            console.log("Room already exists");
            const { tableList } = Games.getTableList(room_id);
            response.redirect(`/gameroom/${tableList}`);
        }
    } catch( error ){
        console.log(error);
        response.redirect("/lobby");
    }
});
router.post("/createTable", async (request, response) => {
    const { id: user_id } = request.session.user;

    try {
        const { id: table_id} = await Games.createGameTable(user_id);
        response,redirect(`/games/${table_id}`);
    } catch (error){
        console.log({error});
        response.redirect("/lobby");
    }
}); 



router.get("/:id", (request, response) => {
    const { id } = request.params;
    response.render("games", { id, title: "Game Page"});
>>>>>>> c9458ea (creating game room from routes)
});

module.exports = router;
