const express = require("express");

const router = express.Router();

router.get("/userhome", (_request, response) => {
  response.render("userhome", { title: "USER'S HOME PAGE" });
});

module.exports = router;