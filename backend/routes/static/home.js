const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "BDLM HOME PAGE" });
});

// router.get('/login', (req, res, next) => {
//   res.render('login');
// });

// router.get('/registration', (req, res, next) => {
//   res.render('registration');
// });

module.exports = router;