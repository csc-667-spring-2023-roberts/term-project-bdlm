import io from "socket.io-client";
import events from "../backend/sockets/constants";

const socket = io({ query: { path: window.location.pathname } });
console.log("f/",socket);
const messageContainer = document.querySelector("#messages");
const chatMessageTemplate = document.querySelector("#chat-message-template");

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
//
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
