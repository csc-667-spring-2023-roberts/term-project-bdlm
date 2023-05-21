const http = require("http");
const { Server } = require("socket.io");

const initSockets = (app, sessionMiddleware) => {
  const Sockets = require("../db/sockets.js");

  const server = http.createServer(app);
  const io = new Server(server);

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    let table_id = socket.handshake.query?.path?.substring(1);
    const user_id = socket.request?.session?.user?.id;

    if (user_id === undefined || table_id === undefined) {
      return;
    }

    if (table_id === "lobby") {
      table_id = 0;
    } else {
      table_id = parseInt(table_id.substring(table_id.lastIndexOf("/") + 1));
    }

    Sockets.add(table_id, user_id, socket.id);

    if (table_id !== 0) {
      Games.state(table_id).then(({ lookup }) => {
        socket.emit(GAME_UPDATED, lookup(user_id));
      });
    }
  });
  app.set("io", io);

  return server;
};

module.exports = initSockets;
