const GAME_CREATED = "game:created";
const GAME_UPDATED = (id) => `game:${id}:updated`;
const CHAT_MESSAGE_RECEIVED = "chat:message";


module.exports = { CHAT_MESSAGE_RECEIVED,GAME_CREATED, GAME_UPDATED };
