const db = require("./connection");

const { create } = require("./games/create.js");
const { join } = require("./games/join.js");
const { availableGames } = require("./games/available.js");
const { leave } = require("./games/leave.js");
const { full } = require("./games/full.js");

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
    "SELECT id, username, email, players.table_order FROM users, players WHERE players.user_id=users.id AND players.table_id=$1",
    [table_id]
  );
  // cards in the players hands
  const hands_data = await db.many(
    "SELECT player_cards FROM players WHERE players.table_id=$1 AND players.user_id=$2 AND players.user_id IN ($2:csv) AND cards.id=gamecards.card_id",
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
  gameState,
  leave,
};
