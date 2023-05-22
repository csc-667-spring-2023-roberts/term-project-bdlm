/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("gametable", {
    id: "id",
    player_count: {
      type: "integer",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("NOW()"),
      notNull: true,
    },
    community_cards: {
      type: "varchar[]"
    },
  });
};
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("gametable");
};
