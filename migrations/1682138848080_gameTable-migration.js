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
            references: {
                model:{
                    tableName: "gameRoom"
                },
                key: "id"
            }
        },
        playersId: {
            type: "id",
            notNull: true,
            references: {
                model: {
                    tableName: "players"
                },
                key: "id"
            }
        },
        current: {
            type: "boolean",
            notNull: true,
            references: {
                model: {
                    tableName: "players"
                },
                key: "current"
            }
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
