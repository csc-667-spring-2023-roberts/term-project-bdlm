const express = require("express");

const router = express.Router();

router.get("/lobby", (_request, response) => {
  response.render("lobby", { title: "LOBBY" });
});

module.exports = router;