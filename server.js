const express = require("express");
const app = express();

var bodyParser = require("body-parser");

const bookRouter = require("./router/books.route.js");
const userRouter = require("./router/users.route.js");
const transRouter = require("./router/transaction.route.js");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/trans", transRouter);

app.get('/',function(req,res){
  res.render('index')
})



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
