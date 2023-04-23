const express = require("express");
const createError = require("http-errors");
const path = require("path");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const homeRoutes = require("./routes/static/home.js");
const authenticationRoutes = require("./routes/static/authentication.js");
const gameroomRoutes = require("./routes/static/gameroom.js");
const tableRoutes = require("./routes/static/table.js");
const tableroomRoutes = require("./routes/static/tableroom.js");
const userhomeRoutes = require("./routes/static/userhome.js");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
//     const livereload = require("livereload");
//     const connectLiveReload = require("connect-livereload");

//     const liveReloadServer = livereload.createServer();
//     liveReloadServer.watch(path.join(__dirname, "backend", "static"));
//     liveReloadServer.server.once("connection", () => {
//         setTimeout(() => {
//             liveReloadServer.refresh("/");
//         }, 100);
//     });

//     app.use(connectLiveReload());
// }

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "backend", "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "backend", "static")));


app.use("/", homeRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/gameroom", gameroomRoutes);
app.use("/tableroom", tableroomRoutes);
app.use("/table", tableRoutes);
app.use("/userhome", userhomeRoutes);




app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createError(404));
});
