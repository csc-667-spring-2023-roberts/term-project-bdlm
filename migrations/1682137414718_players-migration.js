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
            
        }, 
        roomId: {
            type: "integer",
            notNull: true,
          
        },
        current: {
            type: "boolean",
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
