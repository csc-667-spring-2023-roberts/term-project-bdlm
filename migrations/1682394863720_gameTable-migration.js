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
<<<<<<< HEAD
      type: "varchar[]"
=======
      type: "varchar[]",
>>>>>>> 2fc5fecc44f032ae5ef3dae3752e1240864b7d02
    },
  });
};
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("gametable");
};
