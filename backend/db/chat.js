const db = require("./connection.js");

const create = (message, sender_id) =>
  db.one(
    "INSERT INTO livechat (user_id, message) VALUES ($1, $2) RETURNING created_at",
    [sender_id, message]
  );

module.exports = {
  create,
};
