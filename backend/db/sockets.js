const db = require("./connection.js");

const store = (user_id, socket_id, table_id = 0) =>
  db.none(
    "INSERT INTO user_sockets (user_id, table_id, socket_id) VALUES ($1, $2, $3)",
    [user_id, table_id, socket_id]
  );

const remove = (socket_id) =>
  db.none("DELETE FROM user_sockets WHERE socket_id=$1", [socket_id]);

module.exports = {
  store,
  remove,
};
