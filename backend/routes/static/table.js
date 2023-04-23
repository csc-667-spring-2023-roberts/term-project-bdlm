const express = require("express");

const router = express.Router();

//need table id separate from other id
router.get("/:id", (_request, response) => {
  const { id } = request.params;
  response.render("table", { id, title: "TABLE PAGE" });
});

module.exports = router;