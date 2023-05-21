//change
import io from "socket.io-client";
import { getGameId } from "../util/game-id";
import { GAMES } from "../../constants/events";

const socket = io();

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
