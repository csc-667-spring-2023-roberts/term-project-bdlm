const db = require("./connection");

/* ---Denean's logic for this particular file---
1. Create Room -> referring the rooms that contain several tables to join, based on the betting range
2. Create Game Table 
3. List available game tables
4. Add players -> player joins a table to play
5. Update table -> for updating the playerCount
6. Create player cards
7. Draw cards from pile (???) 
8. Update player cards -> as a result of drawing a card
9. 
----- IN PROGRESS -----
*/

const createRoom = (matchType) => db.one(
  "INSERT INTO gameRoom (matchType) VALUES ($1)", 
  [matchType]
);
const createGameTable = (roomId, playerCount) => db.one(
  "INSERT INTO gameTable (roomId, playerCount) VALUES ($1, $2)", 
  [roomId, playerCount]
);
const getTableList = async (userId) => db.any(
  "SELECT t.id FROM gameTable t, players p WHERE t.id = p.tableId AND p.id != $1 AND (SELECT COUNT(*) FROM players p WHERE p.tableId=t.id) < 4",
  [userId]
);
const joinTable = async(tableId, userId) => { 
  const { playercount } = await db.one("SELECT playerCount FROM gameTable tWHERE t.id=$1", [tableId]);

  await db.none("INSERT INTO players (tableId, userId)", [tableId, userId]);
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
const getPlayersList = (tableId) => db.any (
  "SELECT id, username FROM user u, players p WHERE p.tableId=$1 AND p.userId=u.id",
  [tableId]
);
module.exports = {
  createRoom,
  createGameTable,
  getTableList,
  joinTable,
  updateTable,
  createPlayerCards,
  updatePlayerCards,
  getPlayersList,
};
