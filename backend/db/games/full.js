const db = require("../connection.js");

const full = async (table_id) => {
  const { player_count } = await db.one(
    `SELECT player_count FROM gametable g WHERE g.id=$1`,
    [table_id]
  );

  if (player_count >= 4) {
    return true;
  }

  return false;
};

module.exports = { full };
