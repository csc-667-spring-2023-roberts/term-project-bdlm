const db = require("../connection.js");

const availableGames = (user_id) =>
  db.any(
    `SELECT DISTINCT(gametable.id), table_types.small_blind, table_types.big_blind 
     FROM gametable, players, table_types
     WHERE gametable.table_type_id=table_types.id
     AND gametable.id=players.table_id
     AND players.user_id != $1
     AND (SELECT COUNT(*) FROM players WHERE players.table_id=gametable.id) < 4;`,
    [user_id]
  );

module.exports = { availableGames };
