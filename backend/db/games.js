const db = require("./connection");

const { create } = require("./games/create.js");
const { join } = require("./games/join.js");
const { availableGames } = require("./games/available.js");

/* ---Denean's logic for this particular file---
1. Create Room -> referring the rooms that contain several tables to join, based on the betting range
2. Check Rooms -> one room per match_type (based on wireframes, there should only be 4 match types)
3. Create Game Table 
4. List available game tables
5. Add players -> player joins a table to play
6. Update table -> for updating the player_count
7. Create player cards
8. Draw cards from pile (???) 
9. Update player cards -> as a result of drawing a card
 
----- IN PROGRESS -----
*/

const createRoom = (match_type) =>
  db.one("INSERT INTO tableroom (match_type) VALUES ($1) RETURNING id", [
    match_type,
  ]);

const checkRooms = (match_type) =>
  db.any("SELECT COUNT(*) FROM tableroom r WHERE r.match_type=$1", [
    match_type,
  ]);

const createGameTable = (room_id, player_count) =>
  db.one("INSERT INTO gametable (room_id, player_count) VALUES ($1, $2)", [
    room_id,
    player_count,
  ]);

// Gets tables that has not met max capacity of players
const getTableList = async (room_id) =>
  db.any(
    "SELECT t.id FROM gametable t WHERE t.room_id=$1 AND t.player_count < 4",
    [user_id]
  );

const joinTable = async (table_id, user_id) => {
  const { player_count } = await db.one(
    "SELECT player_count FROM gametable tWHERE t.id=$1",
    [table_id]
  );

  await db.none("INSERT INTO players (table_id, user_id, tableOrder)", [
    table_id,
    user_id,
    player_count,
  ]);
};

const updateTable = (player_count, table_id) =>
  db.none("UPDATE gametable SET player_count=$1 WHERE table_id=$2", [
    player_count,
    table_id,
  ]);

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

// Gets list of players inside the table
const getPlayersList = (table_id) =>
  db.any(
    "SELECT id, username FROM user u, players p WHERE p.table_id=$1 AND p.user_id=u.id",
    [table_id]
  );

const tableTypes = () => db.many("SELECT * FROM table_types");

module.exports = {
  createRoom,
  checkRooms,
  createGameTable,
  getTableList,
  joinTable,
  updateTable,
  createPlayerCards,
  updatePlayerCards,
  getPlayersList,
  tableTypes,
  // Sub module
  create,
  join,
  availableGames,
};
