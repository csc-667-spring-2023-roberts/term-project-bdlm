/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("gameCards", {
        id: "id",
        tableId: {
            type: "id",
            notNull: true,
            references: {
                model: {
                    tableName: "gameTable"
                },
                key: "id"
            }
        },
        cardId: {
            type: "id",
            notNull: true,
            references: {
                model: {
                    tableName: "card"
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
        cardOrder: {
            type: "integer",
            notNull: true
        },
        discarded: {
            type: "boolean",
            notNull: true
        },
        drawPile: {
            type: "boolean",
            notNull: true
        },
        flop: {
            type: "boolean",
            notNull: true
        }, 
        turn: {
            type: "boolean",
            notNull: true
        }, 
        river: {
            type: "boolean",
            notNull: true
        }
    });
};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("gameCards");
};
