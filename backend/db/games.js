const db = require("./connection");

/* ---Denean's logic for this particular file---
1. Create Room -> referring the rooms that contain several tables to join, based on the betting range
2. Check Rooms -> one room per matchType (based on wireframes, there should only be 4 match types)
3. Create Game Table 
4. List available game tables
5. Add players -> player joins a table to play
6. Update table -> for updating the playerCount
7. Create player cards
8. Draw cards from pile (???) 
9. Update player cards -> as a result of drawing a card
 
----- IN PROGRESS -----
*/

const createRoom = (matchType) => db.one(
  "INSERT INTO gameRoom (matchType) VALUES ($1) RETURNING id", 
  [matchType]
);
const checkRooms = (matchType) => db.any(
  "SELECT COUNT(*) FROM gameRoom r WHERE r.matchType=$1",
  [matchType]
)
const createGameTable = (roomId, playerCount) => db.one(
  "INSERT INTO gameTable (roomId, playerCount) VALUES ($1, $2)", 
  [roomId, playerCount]
);
// Gets tables that has not met max capacity of players
const getTableList = async (roomId) => db.any(
  "SELECT t.id FROM gameTable t WHERE t.roomId=$1 AND t.playerCount < 4",
  [userId]
);
const joinTable = async(tableId, userId) => { 
  const { playerCount } = await db.one("SELECT playerCount FROM gameTable tWHERE t.id=$1", [tableId]);

  await db.none("INSERT INTO players (tableId, userId, tableOrder)", [tableId, userId, playerCount]);
};
const updateTable = (playerCount, tableId) => db.none(
  "UPDATE gameTable SET playerCount=$1 WHERE tableId=$2",
  [playerCount, tableId]
);
const createPlayerCards = (cardId, userId, cardOrder) => db.one(
  "INSERT INTO gameCards (cardId, playerId, cardOrder) VALUES ($1, $2, $3)",
  [cardId, userId, cardOrder]
);
const updatePlayerCards = (cardId, cardOrder, userId) => db.none(
  "UPDATE gameCards SET cardId=$1 AND cardOrder=$2 WHERE playerId=$3",
  [cardId, cardOrder, userId]
);
// Gets list of players inside the table
const getPlayersList = (tableId) => db.any (
  "SELECT id, username FROM user u, players p WHERE p.tableId=$1 AND p.userId=u.id",
  [tableId]
);
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
};
