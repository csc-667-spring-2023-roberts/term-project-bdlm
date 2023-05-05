/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("gamecards", {
        id: "id",
        table_id: {
            type: "integer",
            notNull: true,
            references: "gametable",
            foreignKeys: "id"
        },
        card_id: {
            type: "integer",
            notNull: true,
            references: "cards",
            foreignKeys: "id"
        },
        user_id: {
            type: "integer",
            notNull: true,
            references: "users",
            foreignKeys: "id"
        },
        card_order: {
            type: "integer",
            notNull: true
        },
        discarded: {
            type: "boolean",
            notNull: true
        },
        draw_pile: {
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
    pgm.dropTable("gamecards");
};
