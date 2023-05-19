const db = require("../connection.js");

const join = async (table_id, user_id, is_current = false) => {
  await db.none(
    `INSERT INTO players 
    (user_id, table_id, current, "tableOrder", bet) 
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
};
module.exports = { join };
