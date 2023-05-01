const db = require("./connection");

/* ---Denean's logic for this particular file---
1. Create Room -> referring the rooms that contain several tables to join, based on the betting range
2. Create Game Table 
3. Add players -> player joins a table to play
4. Update table -> for updating the playerCount
5. 
----- IN PROGRESS -----
*/

const createRoom = (matchType) => db.one(
  "INSERT INTO gameRoom (matchType) VALUES ($1)", 
  [matchType]
);
const createGameTable = (roomId, playerCount) => db.one(
  "INSERT INTO gameTable (roomId, playerCount) VALUES ($1, $2)", 
  [roomId, capacity]
);
const joinTable = (tableId, userId) => db.none(
  "INSERT INTO players (tableId, userId)",
  [tableId, userId]
);
const updateTable = (playerCount, tableId) => db.none(
  "UPDATE gameTable SET playerCount=$1 WHERE tableId=$2",
  [playerCount, tableId]
);

module.exports = {
  createRoom,
  createGameTable,
  joinTable,
  updateTable
};
