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
    `SELECT id, username, email, p.table_order 
    FROM users u, players p
    WHERE p.user_id=u.id AND p.table_id=$1`,
    [table_id]
  );
  console.log(player_data);

  // cards in the players hands
  const hands_data = await db.many(
    `SELECT player_cards 
    FROM players p 
    WHERE p.table_id=$1 
    AND p.user_id IN ($2:csv)`,
    [table_id, player_data.map((p) => p.id)]
  );
  console.log(hands_data);

  // all players bets
  const bet_data = await db.many(
    "SELECT bet FROM players WHERE players.table_id=$1 AND players.user_id IN ($2:csv)",
    [table_id, player_data.map((p) => p.id)]
  );
  console.log(bet_data);

  // all players cash
  const cash_data = await db.many(
    `SELECT total_cash 
    FROM users u, players p
    WHERE p.user_id=u.id
    AND p.table_id=$1 
    AND p.user_id IN ($2:csv)`,
    [table_id, player_data.map((p) => p.id)]
  );
  console.log(cash_data);

  // array of community cards
  const community_cards = await db.one(
    "SELECT community_cards FROM gametable t WHERE t.id=$1",
    [table_id]
  );
  console.log(community_cards);

  return {
    table_id,
    player_data,
    hands_data,
    bet_data,
    cash_data,
    community_cards,
  };
};

const drawCards = async (table_id, count) => {
  const cards = await db.any(
    `SELECT card_id
    FROM game_decks 
    WHERE table_id=$1 AND played=false
    LIMIT $2`,
    [table_id, count]
  );

  await db.none(
    `UPDATE game_decks
    SET played=true
    WHERE table_id=$1 AND card_id IN ($2:csv)`,
    [table_id, cards.map((c) => c.card_id)]
  );

  return cards;
};

const updateHand = async (cards, table_id, user_id) => {
  await db.none(
    `UPDATE players 
    SET player_cards=$1
    WHERE table_id=$2 AND user_id=$3`,
    [cards.map((c) => c.card_id), table_id, user_id]
  );
};

const getTableOrder = (table_id, user_id) => db.one(
  `SELECT table_order
  FROM players
  WHERE table_id=$1 and user_id=$2`,
  [table_id, user_id]
);

const start = async (table_id, user_id) => {
  const fullStatus = await full(table_id);

  if(fullStatus){
      const cards = await drawCards(table_id, 2);
      const players = await getPlayersList(table_id);
      for(let player of players){
          await updateHand(cards, table_id, player.user_id);
      }
  }
};


module.exports = {
  getPlayersList,
  drawCards,
  updateHand,
  gameState,
  getTableOrder,
  start,
  // Sub module
  create,
  full,
  join,
  availableGames,
  leave,
};
