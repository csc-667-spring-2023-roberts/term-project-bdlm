const express = require("express");
const Games = require("../../db/games");

const router = express.Router();

router.get("/:table_id", async (request, response) => {
  const { id: user_id } = request.session.user;
  const { table_id } = request.params;

  response.render("gameroom", {
    table_id,
    user_id,
    title: `Table ${table_id}`,
  });
});

module.exports = router;
