/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("gameTable", {
        id: "id",
        roomId: {
            type: "integer",
            notNull: true,
            foreignKeys: {
                columns: "id",
                references: "gameRoom"
            }
        },
        playerId: {
            type: "integer",
            notNull: true,
            foreignKeys: {
                columns: "id",
                references: "players"
            }
        },
        currentPlayer: {
            type: "boolean",
            notNull: true,
            foreignKeys:{
                columns: "current",
                references:"players"
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
    }
    // {
    //     roomId: {
    //         foreignKeys: {
    //             columns: "id",
    //             references: "gameRoom"
    //         }
    //     },
    //     playersId: {
    //         foreignKeys: {
    //             columns: "id",
    //             references: "players"
    //         }
    //     },
    //     currentPlayer: {
    //         foreignKeys: {
    //             columns: "current",
    //             references: "players"
    //         }
    //     },
    // });
    )};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("gameTable");
};
