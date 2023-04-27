/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("liveChat", {
        id: "id",
        userId: {
            type: "integer",
            notNull: true,
            references: "user",
            foreignKeys: "id"
        },
        messages: {
            type: "varchar(256)"
        }
    });
};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("liveChat");
};
