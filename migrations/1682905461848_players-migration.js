/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("players", {
        // id: "id",
        userId: {
            type: "integer",
            notNull: true,
            references: "user",
            foreignKeys: "id"

        }, 
        tableId: {
            type: "integer",
            notNull: true,
            references: "gameTable",
            foreignKeys: "id"
        },
        current: {
            type: "boolean",
            notNull: true,
            default: false
        },
        tableOrder: {
            type:"integer",
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