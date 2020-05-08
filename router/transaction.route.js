const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const db = require("../db.js");

router.get("/", function(req, res) {
  res.render("trans/trans", {
    trans: db.get("trans").value()
  });
});

router.get("/create", function(req, res) {
  res.render("trans/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
});
router.post("/create", (req, res) => {
  var id = shortid.generate();
  var userId = req.body.userId;
  var bookId = req.body.bookId;
  var userName = db
    .get("users")
    .find({ id: userId })
    .value().name;
  var bookTitle = db
    .get("books")
    .find({ id: bookId })
    .value().title;
  var transaction = { id, userId, bookId, userName, bookTitle };
  db.get("trans")
    .push(transaction)
    .write();
  res.redirect("/trans");
});
module.exports = router;
