//change
import io from "socket.io-client";
import { getGameId } from "../util/game-id";
import { GAMES } from "../../constants/events";

const socket = io();
console.log("f/chat",socket);
const userTemplate = document.querySelector("#user-template");
const users = document.querySelector("#users");

const table_id = getGameId(document.location.pathname);

socket.on(GAMES.PLAYER_JOINED(table_id), ({ username }) => {
  const user = userTemplate.content.cloneNode(true);

  user.querySelector("span.username").innerText = username;

  users.appendChild(user);
});

fetch("/authentication/user", {
  method: "post",
})
  .then((r) => r.json())
  .then(({ id: user_id }) => {
    console.log({ user_id });
    socket.on(
      GAMES.GAME_STATE_UPDATED(table_id, user_id),
      async (game_state) => {
        console.log({ game_state });
      }
    );
  });
  
  socket.on(
    events.CHAT_MESSAGE_RECEIVED,
    ({ table_id, username, message, timestamp }) => {
      if (table_id.toString() == chatMessageTemplate.target.value) {
        entry.querySelector(".username").innerText = username;
        entry.querySelector(".message").innerText = message;
        entry.querySelector(".timestamp").innerText = timestamp;
  
        messageContainer.appendChild(entry);
      }
    }
  );
  document
  .querySelector("input#chatMessage")
  .addEventListener("keydown", (event) => {
    if (event.keyCode !== 13) {
      return;
    }

    const message = event.target.value;
    event.target.value = "";
    const gameId = window.location.pathname.split("/").pop();

    fetch("/chat/{gameId}", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  });