/* eslint-disable camelcase */

exports.shorthands = undefined;
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.createTable("session", {
    sid: {
      type: "varchar(255)",
      notNull: true,
    },
    sess: {
      type: "string",
    },
    expire: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.addConstraint("session", "session_pkey", {
    primaryKey: "sid",
    deferrable: false,
  });
  pgm.createIndex("session", "expire", {
    name: "IDX_session_expire",
  });
};
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("session");
  pgm.dropConstraint("session", "session_pkey", {
    primaryKey: "sid",
    deferrable: false,
  });
  pgm.dropIndex("session", "expire", {
    name: "IDX_session_expire",
  });
};
