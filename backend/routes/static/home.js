const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "BDLM Home Page" });
});

router.get("/authentication/login", (req, res, next) => {
  res.render("login", { title: "BDLM Poker Login" });
});

router.get("/authentication/sign-up", (req, res, next) => {
  res.render("sign-up", { title: "BDLM Poker Sign-up" });
});

module.exports = router;
