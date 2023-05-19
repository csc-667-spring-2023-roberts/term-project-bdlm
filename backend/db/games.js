const db = require("./connection");

const { create } = require("./games/create.js");
const { join } = require("./games/join.js");
const { availableGames } = require("./games/available.js");

const createPlayerCards = (card_id, user_id, card_order) =>
  db.one(
    "INSERT INTO gamecards (card_id, player_id, card_order) VALUES ($1, $2, $3)",
    [card_id, user_id, card_order]
  );

const updatePlayerCards = (card_id, card_order, user_id) =>
  db.none(
    "UPDATE gamecards SET card_id=$1 AND card_order=$2 WHERE player_id=$3",
    [card_id, card_order, user_id]
  );

const getPlayersList = (table_id) =>
  db.any(
    `SELECT username 
    FROM users u, players p 
    WHERE p.table_id=$1 AND u.id=p.user_id
    `,
    [table_id]
  );

const gameState = async (table_id, user_id) => {
  // players in the table
  // current player
  // cards in the players hands
  // next card in card order
  // player bets
  // player chips
  // flop
  // turn
  // river

  // "users" is all of the players at this table
  // get username and user_id from gametable where user_name = gametable.user_id
  // and gametable.tableid=$1 order by gametable.created_at
  const users = await db.many("SELECT id FROM gametable", [table_id]);

  return {
    table_id,
    users,
    user_id,
  };
};

module.exports = {
  createPlayerCards,
  updatePlayerCards,
  getPlayersList,
  // Sub module
  create,
  join,
  availableGames,
};
