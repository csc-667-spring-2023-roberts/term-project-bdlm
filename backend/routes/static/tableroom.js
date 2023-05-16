const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");
const Games = require("../../db/games");

const router = express.Router();

//need tableroom id separate from other id
router.get("/:id", async (_request, response) => {
  const { id } = request.params;
  const { user_id } = request.session.user;

  response.render("tableroom", {
    id,
    title: "Table ROOM PAGE",
    table_types: await Games.tableTypes(),
    available_tables: await Games.availableGames(user_id),
  });
});

module.exports = router;
