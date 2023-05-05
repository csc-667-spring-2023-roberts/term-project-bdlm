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
        message: {
            type: "varchar(256)",
            notNull: true
        },
        created_at: {
            type: "timestamp",
            notNull: true, 
            default: pgm.func("current_timestamp"),
        }
    });
};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("liveChat");
};
