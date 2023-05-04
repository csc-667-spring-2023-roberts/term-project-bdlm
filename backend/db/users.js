const db = require("./connection.js");

const create = (firstname, lastname, username, email, hash) =>
  db.one(
    "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [firstname, lastname, username, email, hash]
  );

const findByEmail = (email) =>
  db.one("SELECT * FROM users WHERE email=$1", [email]);

module.exports = {
  create,
  findByEmail,
};
