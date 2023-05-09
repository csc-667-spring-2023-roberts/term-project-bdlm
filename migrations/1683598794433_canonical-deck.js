/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  const symbols = ["S", "C", "H", "D"];
  const inserts = [];

  for (let card = 1; card <= 13; card++) {
    for (let suit = 0; suit < symbols.length; suit++) {
      inserts.push(`('${symbols[suit]}', ${card})`);
    }
  }

  const sql = `INSERT INTO cards (symbol, number) VALUES ${inserts.join(",")}`;
  pgm.sql(sql);
};

exports.down = (pgm) => {};
