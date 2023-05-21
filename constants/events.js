const PLAYER_JOINED = (table_id) => `game:${table_id}:player-joined`;
const GAME_STATE_UPDATED = (table_id, user_id) =>
  `game:${table_id}:${user_id}:updated`;

module.exports = {
  GAMES: { PLAYER_JOINED, GAME_STATE_UPDATED },
};
