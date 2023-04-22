/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("players", {
        id: "id",
        userId: {
            type: "id",
            notNull: true,
            references: {
                model: {
                    tableName:'user'
                },
                key: "id",
            }
        }, 
        roomId: {
            type: "id",
            notNull: true,
            references:{
                model: {
                    tableName: "gameRoom"
                },
                key: "id"
            }
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
