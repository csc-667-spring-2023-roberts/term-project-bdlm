const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../db/users.js");
const {
  redirectIfAuthenticated,
} = require("../../middleware/redirect-if-authenticated.js");

const router = express.Router();

const SALT_ROUNDS = 10;

router.get("/sign-up", (_request, response) => {
  response.render("sign-up", { title: "SIGN UP PAGE" });
});

router.post("/register", async (request, response) => {
  const { username, email, password, firstName, lastName } = request.body;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try {
    const { id } = await Users.create(
      username,
      email,
      hash,
      firstName,
      lastName
    );
    request.session.user = {
      id,
      username,
      email,
      firstName,
      lastName,
    };

    response.redirect("/lobby");
  } catch (error) {
    console.log({ error });
    response.render("sign-up", {
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
  const { email, password } = request.body;

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

    response.render("login", { title: "BDLM Term Project", email });
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy((error) => {
    console.log({ error });
  });

  response.redirect("/");
});

module.exports = router;
