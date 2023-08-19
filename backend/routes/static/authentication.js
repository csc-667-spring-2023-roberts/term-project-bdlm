const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../db/users.js");
const {
  redirectIfAuthenticated,
} = require("../../middleware/redirect-if-authenticated.js");

const router = express.Router();

const SALT_ROUNDS = 10;

router.get("/register", (_request, response) => {
  response.render("register", { title: "SIGN UP PAGE" });
});

router.post("/register", async (request, response) => {
  const { username, email, password, firstname, lastname } = request.body;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try {
    const { id } = await Users.create(
      username,
      email,
      hash,
      firstname,
      lastname
    );
    request.session.user = {
      id,
      username,
      email,
      firstname,
      lastname,
    };

    response.redirect("/lobby");
  } catch (error) {
    console.log({ error });
    response.render("register", {
      title: "BDLM Term Project",
      username,
      email,
    });
  }
});

router.get("/login", (_request, response) => {
  response.render("login", { title: "LOGIN PAGE" });
});

router.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    const { id, password: hash } = await Users.findByUsername(username);
    const isValidUser = await bcrypt.compare(password, hash);

    if (isValidUser) {
      request.session.user = {
        id,
        username,
      };
      response.redirect("/lobby");
    } else {
      throw "Credentials invalid";
    }
  } catch (error) {
    console.log({ error });

    response.render("login", { title: "BDLM Term Project", username });
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy((error) => {
    console.log({ error });
  });

  response.redirect("/");
});


router.post("/user", (request, response) => {
  const { id } = request.session.user;

  response.json({ id });
});

module.exports = router;
