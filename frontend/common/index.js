import io from "socket.io-client";

const socket = io({ query: { path: window.location.pathname } });

export default socket;