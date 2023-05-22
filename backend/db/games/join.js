const db = require("../connection.js");

const join = async (table_id, user_id, is_current = false) => {
  try {
    const player = await db.one(
      "SELECT user_id FROM players WHERE table_id=$1 AND user_id=$2",
      [table_id, user_id]
    );
  } catch (error) {
    console.log("Player " + user_id + " is already not in table, join allowed");

    await db.none(
      `INSERT INTO players 
      (user_id, table_id, current, "table_order", bet) 
      SELECT $1, $2, $3, count(*) + 1, 0 FROM players 
      WHERE table_id=$2 `,
      [user_id, table_id, is_current]
    );
    await db.none(
      `UPDATE gametable
      SET player_count = player_count + 1
      WHERE id=$1`,
      [table_id]
    );

    return;
  }

  console.log("User: " + user_id + " is already in this table");
  return;
};
module.exports = { join };
