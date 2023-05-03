var express = require("express");
//const { isLoggedIn } = require('../middleware/protectors');
//const { getRecentPosts, getPostById, getCommentsForPostById } = require('../middleware/posts');
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("home", { title: "BDLM HOME PAGE" });
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: "BDLM Poker Login" });
});

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up", { title: "BDLM Poker Sign-up" });
});

/*
router.get("/postimage", isLoggedIn, function(req, res) {
  res.render('postimage');
});

router.get("/registration", function(req, res) {
  res.render('registration');
});

router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostById, function(req, res) {
  res.render('viewpost');
});

router.get("/tos", function(req, res) {
  res.render('tos');
});

router.get("/acceptableuse", function(req, res) {
  res.render('acceptableuse');
});
*/
module.exports = router;
