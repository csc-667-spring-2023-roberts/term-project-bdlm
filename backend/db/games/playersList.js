const db = require("../connection.js");

const getPlayersList = (table_id) =>
  db.any(
    "SELECT id, username FROM user u, players p WHERE p.table_id=$1 AND p.user_id=u.id",
    [table_id]
  );

module.exports = { getPlayersList };
