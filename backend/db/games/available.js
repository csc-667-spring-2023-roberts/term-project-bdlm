const db = require("../connection.js");

const availableGames = async (user_id) => 
  await db.any(
    `SELECT DISTINCT (gametable.id), gametable.player_count
     FROM gametable, players
     WHERE gametable.id=players.table_id
     AND players.user_id != $1
     AND (SELECT COUNT(*) FROM players WHERE players.table_id=gametable.id) < 4`,
    [user_id]
  );

module.exports = { availableGames };
