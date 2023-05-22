/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.addColumn("users", {
    total_cash: { type: "integer", notNull: true, default: 0 },
  });

  pgm.dropColumn("players", "totalCash");
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropColumn("users", "total_cash");

  pgm.addColumn("players", {
    totalCash: {
      type: "integer",
      notNull: true,
    },
  });
};
