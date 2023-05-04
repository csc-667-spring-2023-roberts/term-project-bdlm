<<<<<<< HEAD
const db = require("./connection.js");

const create = (firstname, lastname, username, email, hash) =>
  db.one(
    "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [firstname, lastname, username, email, hash]
  );

const findByEmail = (email) =>
  db.one("SELECT * FROM users WHERE email=$1", [email]);
=======
const db = require("./connection");
const create = (username, email, password, firstName, lastName) => db.one(
    "INSERT INTO user (username, email, password, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [username, email, password, firstName, lastName]
);
const findByUsername = (username) => db.one(
    "SELECT * FROM user WHERE username=$1",
    [username]
);
const findByEmail = (email) => db.one(
    "SELECT * FROM user WHERE email=$1", 
    [email]
);
>>>>>>> db1486df95c3516bf7d16db78dae2bdc0904ec68

module.exports = {
    create,
    findByUsername,
    findByEmail,
};