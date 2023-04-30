const db = require("./connection");
const create = (username, email, password) => db.one(
    "INSERT INTO user (username, email, password) VALUES ($1, $2, $3) RETURNING id",
    [username, email, password]
);
const findByUsername = (username) => db.one(
    "SELECT * FROM user WHERE username=$1",
    [username]
);
const findByEmail = (email) => db.one(
    "SELECT * FROM user WHERE email=$1", 
    [email]
);

module.exports = {
    create,
    findByUsername,
    findByEmail,
};