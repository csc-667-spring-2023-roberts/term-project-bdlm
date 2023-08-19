const express = require("express");
const Games = require("../../db/games.js");
const {
  GAME_CREATED,
  MAX_PLAYERS,
  GAME_STARTING,
  GAME_UPDATED,
} = require("../../../shared/constants.js");
//API routes often follow a RESTful design pattern and are 
//commonly used to perform CRUD (Create, Read, Update, Delete) operations on resources.
// They are typically accessed by client applications through HTTP requests,
// and the responses are often in a structured format such as JSON or XML.
const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;
//Inside the callback function, you can define the logic 
//that should be executed when the route is triggered. 
//This can include tasks such as fetching data, 
//processing requests, rendering views, or sending back a response to the client.
console.log("***",typeof available_games);
  try {
    const available_games = await Games.list(user_id);
    response.json(available_games);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});
// Once you use a method like response.send(), response.json(), 
// or response.render() to send a response, it completes the
// response and sends it back to the client. Any subsequent 
// attempts to send a response using the same response 
// object will result in an error or unexpected behavior.
 router.post("/create", async (request, response) => {
  const { id: user_id } = request.session.user;
  const io = request.app.get("io");

  console.log("*** games api /create", typeof io);
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

  console.log("--- MOVE ---\n");
  // console.log(request.body);
  const io = request.app.get("io");
  const value = request.body.action;

  console.log("*** move");
  // document.getElementById("all-in-btn").addEventListener("click", function() {

  //   alert("Button clicked!");

  // });

  try {
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
  console.log("*** /:id/join", typeof io);

  try {
    const fullStatus = await Games.full(table_id);
    console.log(`full status ${fullStatus}` );

    if (fullStatus) {
      //else join game as spectator
      response.redirect("/lobby");

    } else {
      await Games.join(table_id, user_id);
      const state = await Games.gameState(table_id, user_id);
      io.emit(GAME_UPDATED(table_id), state);
      // io.to(socket_id).emit(message_name, {})
      // io.to(socket_id).emit("GAME UPDATE", { state });
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

