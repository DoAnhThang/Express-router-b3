const express = require("express");
const router = express.Router();

const shortid = require("shortid");
const db = require("../db.js")

router.get('/', function(req, res) {
  res.render("books", {
    books: db.get("books").value()
  });
});

router.post('/',function(req,res){
  req.body.id = shortid.generate();
  db.get('books')
    .push(req.body)
    .write()
  res.redirect('back')
})

router.get('/:id/update', function(req,res){
  var id = req.params.id;
  res.render('update-title',{
    id:id
  })
})

router.post('/update', function(req,res){
  db.get('books')
    .find({id: req.body.id})
    .assign({title: req.body.title})
    .write()
  res.redirect('/books')
})

router.get('/:id/delete', function(req,res){
  var id = req.params.id;
  db.get('books')
    .remove({id:id})
    .write()
  res.redirect('back')
})
module.exports = router;