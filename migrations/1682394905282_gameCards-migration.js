/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("gameCards", {
        id: "id",
        tableId: {
            type: "integer",
            notNull: true,
            foreignKeys: {
                columns: "id",
                references: "gameTable"
            }
        },
        cardId: {
            type: "integer",
            notNull: true,
            foreignKeys: {
                columns: "id",
                references: "cards"
            }
        },
        playersId: {
            type: "integer",
            notNull: true,
            foreignKeys: {
                columns: "id",
                references: "players"
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
