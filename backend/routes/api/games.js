const express = require("express");
const Games = require("../../db/games.js");
const { GAME_CREATED, GAME_UPDATED } = require("../../../shared/constants.js");

const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;

  try {
    const available_games = await Games.list(user_id);

    response.json(available_games);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

router.post("/create", async (request, response) => {
  const { id: user_id } = request.session.user;
  const io = request.app.get("io");

  try {
    const { id: table_id, created_at } = await Games.create(user_id);

    io.emit(GAME_CREATED, { table_id, created_at });

    response.redirect(`/games/${table_id}`);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

router.post("/:id/move", async (request, response) => {
  const { id: table_id } = request.params;
  const { id: user_id } = request.session.user;
  // const { x, y } = request.body;

  console.log("--- MOVE ---");
  console.log(request.body);
  const io = request.app.get("io");

  try {
    // const state = await Games.isMoveValid(game_id, user_id, x, y);
    // io.emit(GAME_UPDATED(game_id), state);

    response.status(200).send();
  } catch (error) {
    console.log({ error });

    response.status(500).send();
  }
});

router.post("/:id/join", async (request, response) => {
  const { id: table_id } = request.params;
  const { id: user_id } = request.session.user;
  const io = request.app.get("io");

  try {
    const fullStatus = await Games.full(table_id);
    console.log("Full Status: ", fullStatus);
``
    if (fullStatus) {
      console.log("TABLE FULL " + table_id);

      response.redirect("/lobby");
    } else {

      await Games.join(table_id, user_id);
    
      const state = await Games.gameState(table_id, user_id);
      io.emit(GAME_UPDATED(table_id), state);
      // io.to(socket_id).emit(message_name, {})
      io.to(socket_id).emit("GAME UPDATE", {state});
      response.redirect(`/games/${table_id}`);
    }
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

router.post("/:id/leave", async (request, response) => {
  const { id: table_id } = request.params;
  const { id: user_id } = request.session.user;
  const io = request.app.get("io");

  try {
    await Games.leave(table_id, user_id);

    const state = await Games.gameState(table_id, user_id);
    io.emit(GAME_UPDATED(table_id), state);

    response.redirect("/lobby");
  } catch (error) {
    console.log({ error });

    response.status(500).send();
  }
});
module.exports = router;
