const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const db = require("../db.js");

router.get("/", function(req, res) {
  res.render("users/users", {
    users: db.get("users").value()
  });
});

router.post("/", function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("back");
});

router.get("/:id/update", function(req, res) {
  var id = req.params.id;
  res.render("users/edit-name", {
    id: id
  });
});

router.post("/update", function(req, res) {
  db.get("users")
    .find({ id: req.body.id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users");
});

router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("back");
});

module.exports = router;
