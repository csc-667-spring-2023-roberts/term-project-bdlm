const express = require("express");
const router = express.Router();
const events = require("../../../shared/constants");
const chat = require("../../db/chat.js");
const { isAuthenticated } = require("../../middleware/is-authenticated.js");

//when pressing enter in chat
router.post("/:id", async (request, response) => {
  const io = request.app.get("io");
  const { message } = request.body;
  const { username, id } = request.session.user;
  
  console.log("**routes/static/chat**");
  console.log("the message is",request.body);

  const { created_at: timestamp } = await chat.create(message, id);
  // console.log(events.CHAT_MESSAGE_RECEIVED);
  
  io.emit(events.CHAT_MESSAGE_RECEIVED, {
    message,
    username,
    timestamp: Date.now(),
  });

  response.status(200);
});

module.exports = router;
