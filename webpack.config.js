const path = require("path");

module.exports = {
  entry: {
    chat: { import: path.join(__dirname, "frontend", "chat", "index.js") },
    games: { import: path.join(__dirname, "frontend", "games", "index.js") },
    entry: { import: path.join(__dirname, "frontend",  "index.js") },
    
  },
  output: {
    path: path.join(__dirname, "backend", "static", "scripts"),
    publicPath: "/backend/static/scripts",
    filename: "[name].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },
};
