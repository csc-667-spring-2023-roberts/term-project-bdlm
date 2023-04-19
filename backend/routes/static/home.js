const express = require("express");

const router = express.Router();

router.get("/", (_request, response) => {
  response.render("home", { title: "BDLM HOME PAGE" });
});

module.exports = router;
