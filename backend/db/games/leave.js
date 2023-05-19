const db = require("../connection.js");

const leave = async (table_id, user_id) => {
  await db.none(
    `DELETE FROM players
    WHERE table_id=$1 AND user_id=$2 `,
    [table_id, user_id]
  );
  await db.none(
    `UPDATE gametable
    SET player_count = player_count - 1
    WHERE id=$1`,
    [table_id]
  )
};
module.exports = { leave };