const { join } = require("./join.js");
const db = require("../connection.js");

const create = async (user_id, table_type_id) => {
  // Create the game table
  const { id: table_id, created_at } = await db.one(
    "INSERT INTO gametable (table_type_id) VALUES ($1) RETURNING id, created_at",
    [table_type_id]
  );

  // Insert the creating user into the players table
  await join(table_id, user_id, true);

  // Copy of deck for this game
  await db.none(
    `INSERT INTO game_decks (table_id, card_id) SELECT $1, id FROM cards ORDER BY RANDOM()`,
    [table_id]
  );

  return { id: table_id, created_at };
};

module.exports = { create };