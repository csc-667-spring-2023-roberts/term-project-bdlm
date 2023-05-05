/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("livechat", {
        id: "id",
        user_id: {
            type: "integer",
            notNull: true,
            references: "users",
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
    pgm.dropTable("livechat");
};
