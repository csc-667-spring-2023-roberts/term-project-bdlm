const db = require("./connection.js");

const create = (message, sender_id) =>
  db.one(
    "INSERT INTO chat (sender_id, message) VALUES ($1, $2) RETURNING created_at",
    [sender_id, message]
  );

module.exports = {
  create,
};
// const express = require("express");

// const router = express.Router();

// router.post("/:id", (request, response) => {
//   const io = request.app.get("io");

//   const { message } = request.body;
//   const sender = request.session.user.username;

//   io.emit("chat-message", { message, sender });
// });

// module.exports = router;