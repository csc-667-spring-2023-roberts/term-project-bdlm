/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("players", {
        id: "id",
        userId: {
            type: "integer",
            notNull: true,
            foreignKeys: {
                columns: "id",
                references: "user"
            }
        }, 
        roomId: {
            type: "integer",
            notNull: true,
            foreignKeys: {
                columns: "id",
                references: "gameRoom"
            }
        },
        current: {
            type: "boolean",
            notNull: true
        },
        bet: {
            type: "integer",
            notNull: true
        },
        totalCash: {
            type: "integer",
            notNull: true
        }
    });
};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("players");
};
