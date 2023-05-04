
const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../db/users.js");

const router = express.Router();

const SALT_ROUNDS = 10;


router.get("/sign-up", (_request, response) => {
  response.render("sign-up", { title: "SIGN UP PAGE" });
});

router.post("/register", async (request, response) => {
  const { firstname, lastname, username, email, password } = request.body;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try {
    const { id } = await Users.create(firstname, lastname, username, email, hash);
    request.session.user = {
      id,
      firstname,
      lastname,
      username,
      email,
    };

    response.redirect("/lobby");
  } catch (error) {
    console.log({ error });
    response.render("register", {
      title: "Texas Hold Em",
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
    const { id, username, password: hash } = await Users.findByEmail(email);
    const isValidUser = await bcrypt.compare(password, hash);

    if (isValidUser) {
      request.session.user = {
        id,
        username,
        email,
      };

      response.redirect("/lobby");
    } else {
      throw "Credentials invalid";
    }
  } catch (error) {
    console.log({ error });

    response.render("login", { title: "Texas Hold Em", email });
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy((error) => {
    console.log({ error });
  });

  response.redirect("/");
});

module.exports = router;
