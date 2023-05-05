const express = require("express");
const Games = require("../../db/games");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");

const router = express.Router();

<<<<<<< HEAD
router.post("/create", async (request, response) => {
  const { id: userId } = request.session.user;

  try {
    const { id: tableId } = await Games.createGameTable(userId);
    response, redirect(`/games/${tableId}`);
  } catch (error) {
    console.log({ error });
    response.redirect("/lobby");
  }
});
router.get("/:id", (request, response) => {
  const { id } = request.params;
  response.render("games", { id, title: "BDLM Term Project" });
=======
router.get('/:matchType', async(request, response) => {
    const { matchType } = request.params;
    try {
        const { check } = await Games.checkRooms(matchType);
        if (check < 1) {
            console.log("Room does not exist. Creating new room .... ")
            const { roomId } = Games.createRoom(matchType);
            response.redirect(`/games/${roomId}`);
        }
        else{
            console.log("Room already exists");
            const { tableList } = Games.getTableList(roomId);
            response.redirect(`/gameroom/${tableList}`);
        }
    } catch( error ){
        console.log(error);
        response.redirect("/lobby");
    }
});
router.post("/createTable", async (request, response) => {
    const { id: userId } = request.session.user;

    try {
        const { id: tableId} = await Games.createGameTable(userId);
        response,redirect(`/games/${tableId}`);
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
