/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("gameTable", {
        id: "id",
        roomId: {
            type: "id",
            notNull: true,
            
        },
        playersId: {
            type: "id",
            notNull: true,
            
        },
        current: {
            type: "boolean",
            notNull: true,
            
        },
        capacity: {
            type: "integer",
            notNull: true,
        },
        matchType: {
            type: "varchar(256)",
            notNull: true,
        }
    });
};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("gameTable");
};
