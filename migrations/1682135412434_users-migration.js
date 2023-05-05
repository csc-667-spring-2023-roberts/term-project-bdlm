/* eslint-disable camelcase */

exports.shorthands = undefined;

/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
    pgm.createTable("users", {
        id: "id",
        username: {
            type: "varchar(50)",
            notNull: true,
            unique: true
        },
        email: {
            type: "varchar(256)",
            notNull: true,
            unique: true
        },
        password: {
            type: "char(70)",
            notNull: true
        },
        firstName: {
            type: "varchar(256)",
            notNull: true
        },
        lastName: {
            type:"varchar(256)",
            notNull: true
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        }
    });
};
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
exports.down = pgm => {
    pgm.dropTable("users");
};
