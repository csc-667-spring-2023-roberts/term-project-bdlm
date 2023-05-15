const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  console.log("****check working****");
  // const { id: user_id } = request.session.user;

  // try {
  //   const available_games = await Games.list(user_id);

  //   response.json(available_games);
  // } catch (error) {
  //   console.log({ error });

  //   response.redirect("/lobby");
  // }
});

module.exports = router;
