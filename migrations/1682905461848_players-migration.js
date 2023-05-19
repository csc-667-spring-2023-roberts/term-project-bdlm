/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("players", {
        user_id: {
            type: "integer",
            notNull: true,
            references: "users",
            foreignKeys: "id"

        }, 
        table_id: {
            type: "integer",
            notNull: true,
            references: "gametable",
            foreignKeys: "id"
        },
        current: {
            type: "boolean",
            notNull: true,
            default: false
        },
        player_cards: {
            type: 'varchar[]'
        },
        table_order: {
            type:"integer",
            notNull: true
        },
        bet: {
            type: "integer",
            notNull: true
        },
        totalCash: {
            type: "integer",
            notNull: true,
        },
    });
};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("players");
};
