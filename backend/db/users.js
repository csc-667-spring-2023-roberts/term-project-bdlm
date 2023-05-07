const db = require("./connection.js");
const create = (username, email, password, firstname, lastname) =>
  db.one(
    "INSERT INTO users (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [username, email, password, firstname, lastname]
  );
const findByUsername = (username) =>
  db.one("SELECT * FROM users WHERE username=$1", [username]);
const findByEmail = (email) =>
  db.one("SELECT * FROM users WHERE email=$1", [email]);

module.exports = {
  create,
  findByUsername,
  findByEmail,
};
