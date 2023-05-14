const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");

const router = express.Router();

//need table id separate from other id
router.get("/:id", (_request, response) => {
  const { id } = request.params;
  response.render("table", { id, title: "TABLE" });
});

module.exports = router;

router.get("/:table_id", async (request, response) => {
  const { id: user_id } = request.session.user;
  const { table_id } = request.params;

  // TODO Send game state to user
  response.render("tableroom", {
    table_id,
    user_id,
    title: `Table ${table_id}`,
  });
});
