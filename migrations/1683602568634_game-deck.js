/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("game_decks", {
    table_id: {
      type: "integer",
      notNull: true,
      references: "gametable",
      foreignKeys: "id",
    },
    card_id: {
      type: "integer",
      notNull: true,
      references: "cards",
      foreignKeys: "id",
    },
    // Set to true when assigned to a player
    // Reset to false when shuffling
    // Draw: SELECT * FROM game_decks WHERE game_id=42 AND played=false LIMIT 1
    played: {
      type: "boolean",
      default: false,
      notNull: true,
    },
  });
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("game_decks");
};
