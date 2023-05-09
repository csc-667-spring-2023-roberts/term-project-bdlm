/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.addColumn("gametable", {
    table_type_id: { type: "integer", notNull: true },
  });

  pgm.dropColumn("gametable", ["room_id", "player_count"]);

  pgm.createTable("table_types", {
    id: "id",
    small_blind: { type: "integer", notNull: true },
    big_blind: { type: "integer", notNull: true },
  });

  pgm.sql(
    `INSERT INTO table_types (small_blind, big_blind) VALUES (1, 3), (5, 10), (25, 50), (50, 100)`
  );
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropColumn("gametable", "table_type_id");
  pgm.addColumn("gametable", {
    room_id: {
      type: "integer",
      notNull: true,
      references: "gameroom",
      foreignKeys: "id",
    },
    player_count: {
      type: "integer",
      notNull: true,
    },
  });
  pgm.dropTable("table_types");
};
