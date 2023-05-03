const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.post("/create", async (request, response) => {
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
    response.render("games", { id, title: "BDLM Term Project"});
});

module.exports = router;