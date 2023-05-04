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
            references: "gameRoom",
            foreignKeys: "id"
        },
        // playerId: {
        //     type: "integer",
        //     notNull: true,
        //     references: "players",
        //     foreignKeys: "id"
        // },
        playerCount: {
            type: "integer",
            notNull: true,
        }
    }
)};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("gameTable");
};
