// const express = require("express");
// const { isAuthenticated } = require("../../middleware/is-authenticated.js");
// const Games = require("../../db/games");

// const router = express.Router();

// //need tableroom id separate from other id
// router.get("/:table_type_id", async (_request, response) => {
//   const { id: user_id } = request.session.user;
//   const { table_type_id } = request.params;
//   const { table_id } = request.session.table_id;

//   response.render("tableroom", {
//     table_id,
//     user_id,
//     title: `Table ${table_type_id}`,
//     getTable: await Games.getTableList(table_type_id),
//     table_type: await Games.tableTypes(),
//     available_tables: await Games.availableGames(user_id)
//   });
// });

// module.exports = router;
