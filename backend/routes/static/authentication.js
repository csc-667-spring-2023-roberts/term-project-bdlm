const express = require("express");

const router = express.Router();

router.get("/sign-up", (_request, response) => {
  response.render("sign-up", { title: "SIGN UP PAGE" });
});

router.get("/login", (_request, response) => {
  response.render("login", { title: "LOGIN PAGE" });
});

module.exports = router;