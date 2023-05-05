const express = require("express");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");

const router = express.Router();

//need gameroom id separate from other id
router.get("/:id", (_request, response) => {
  const { id } = request.params;
  response.render("gameroom", { id, title: "GAME ROOM PAGE" });
});

module.exports = router;
