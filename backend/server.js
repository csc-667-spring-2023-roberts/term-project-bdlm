const express = require("express");
const createError = require("http-errors");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const addSessionLocals = require("./middleware/add-session-locals.js");
const isAuthenticated = require("./middleware/is-authenticated.js");
const initSockets = require("./sockets/initialize.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const db = require("./db/connection.js");


const homeRoutes = require("./routes/static/home.js");
const authenticationRoutes = require("./routes/static/authentication.js");
const gameroomRoutes = require("./routes/static/gameroom.js");
const tableRoutes = require("./routes/static/table.js");
const tableroomRoutes = require("./routes/static/tableroom.js");
const userhomeRoutes = require("./routes/static/userhome.js");
const testRoutes = require("./routes/test/index.js");
const chatRoutes = require("./routes/static/chat.js");
const apiGamesRoutes = require("./routes/api/games.js");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");

    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, "static"));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

    app.use(connectLiveReload());
}

const sessionMiddleware = session({
  store: new pgSession({ pgPromise: db }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
});

app.use(sessionMiddleware);
const server = initSockets(app, sessionMiddleware);

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "static")));
app.use(addSessionLocals);

app.use("/", homeRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/gameroom",isAuthenticated, gameroomRoutes);
app.use("/tableroom", tableroomRoutes);
app.use("/table", tableRoutes);
app.use("/userhome", userhomeRoutes);
app.use("/test", testRoutes);
app.use("/chat", chatRoutes);
app.use("/api/games", isAuthenticated, apiGamesRoutes);



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createError(404));
});
