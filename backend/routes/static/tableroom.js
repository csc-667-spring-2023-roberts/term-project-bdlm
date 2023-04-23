const express = require("express");

const router = express.Router();

//need tableroom id separate from other id
router.get("/:id", (_request, response) => {
  const { id } = request.params;
  response.render("tableroom", { id, title: "TABLE ROOM PAGE" });
});

module.exports = router;