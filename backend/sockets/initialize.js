const http = require("http");
const { Server } = require("socket.io");

const initSockets = (app, sessionMiddleware) => {
  const Sockets = require("../db/sockets.js");

  const server = http.createServer(app);
  const io = new Server(server);

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    const { id: user_id } = socket.request.session.user;
    const { id: socket_id } = socket;

    let table_id = socket.handshake.query.path.substring(1);

    if (table_id === "lobby") {
      table_id = 0;
    } else {
      table_id = parseInt(table_id.substring(table_id.lastIndexOf("/") + 1));
    }

    Sockets.store(user_id, socket_id, table_id);

    socket.on("disconnect", () => {
      Sockets.remove(socket_id);
    });
  });

  app.set("io", io);

  return server;
};

module.exports = initSockets;
