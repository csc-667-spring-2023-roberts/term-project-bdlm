const express = require("express");
const router = express.Router();
const events = require("../../sockets/constants.js");
const chat = require("../../db/chat.js");

router.post("/:id", async (request, response) => {
  const io = request.app.get("io");
  const { message } = request.body;
  const { username, id } = request.session.user;

  const { created_at: timestamp } = await chat.create(message, id);

  io.emit(events.CHAT_MESSAGE_RECEIVED, {
    message,
    username,
    timestamp,
  });

  response.status(200);
});

module.exports = router;
