const db = require("./connection");

const { create } = require("./games/create.js");
const { join } = require("./games/join.js");
const { availableGames } = require("./games/available.js");
const { leave } = require("./games/leave.js");
const { full } = require("./games/full.js")

const getPlayersList = (table_id) =>
  db.any(
    `SELECT username 
    FROM users u, players p 
    WHERE p.table_id=$1 AND u.id=p.user_id
    `,
    [table_id]
  );

const drawCards = (table_id, count) => 
  db.any(
    `SELECT * 
    FROM game_decks d 
    WHERE d.table_id=$1 AND d.played=true
    LIMIT $2`,
    [table_id, count]
  );

const updateHand = async (cards, table_id, user_id) => 
  db.none(
    `UPDATE players 
    SET player_cards=$1
    WHERE table_id=$2 AND user_id=$3`,
    [cards, table_id, user_id]
  );

module.exports = {
  getPlayersList,
  drawCards,
  updateHand,
  full,
  // Sub module
  create,
  join,
  availableGames,
  leave,
};
