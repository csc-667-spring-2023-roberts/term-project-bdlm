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
  // and turn order
  const player_data = await db.many(
    "SELECT id, username, email, players.tableOrder FROM users, players WHERE players.user_id=users.id AND players.table_id=$1",
    [table_id]
  );
  // cards in the players hands
  const hands_data = await db.many(
    "SELECT card_id, cards FROM gamecards WHERE gamecards.table_id=$1 AND gamecards.user_id IN ($2:csv) AND cards.id=gamecards.card_id",
    [game_id, player_data.map((p) => p.id)]
  );

  // all players bets
  const bet_data = await db.many(
    "SELECT bet FROM players WHERE players.table_id=$1 AND players.user_id IN ($2:csv)",
    [game_id, player_data.map((p) => p.id)]
  );

  // all players cash
  const cash_data = await db.many(
    "SELECT totalCash FROM players WHERE players.table_id=$1 AND players.user_id IN ($2:csv)",
    [game_id, player_data.map((p) => p.id)]
  );

  return {
    table_id,
    player_data,
    hands_data,
    bet_data,
    cash_data,
  };

  // next card in card order
  // flop
  // turn
  // river

  // "users" is all of the players at this table
  // get username and user_id from gametable where user_name = gametable.user_id
  // and gametable.tableid=$1 order by gametable.created_at
  /*
  const users = await db.many("SELECT id FROM gametable", [table_id]);

  return {
    table_id,
    users,
    user_id,
  };
  */
};

module.exports = {
  createPlayerCards,
  updatePlayerCards,
  getPlayersList,
  // Sub module
  create,
  join,
  availableGames,
  gameState,
};
