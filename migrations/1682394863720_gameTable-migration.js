/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("gametable", {
    id: "id",
    room_id: {
      type: "integer",
      notNull: true,
      references: "gameroom",
      foreignKeys: "id",
    },
    // player_id: {
    //     type: "integer",
    //     notNull: true,
    //     references: "players",
    //     foreignKeys: "id"
    // },
    player_count: {
      type: "integer",
      notNull: true,
    },
  });
};
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("gametable");
};
