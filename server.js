const express = require('express');
const path = require('path');
let ejs = require('ejs');
const app = express();
const port = 3000;

//lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

//body-parser
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// middleware
// // static files
app.use(express.static(path.join(__dirname , '/public')));

// // view(ejs) files
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname , '/views'));

// temp data in db.json file
db.defaults({
  posts:[]
}).write();

// routing
app.get("/posts", (req, res) => {
  const posts = db.get("posts").value();
  res.render("index",{posts});
});

app.post("/", (req, res) => {

  const posts = db.get("posts").value();
  const body = req.body;

  const newPost = {
    id: posts.length + 1,
    title: body.title,
    body: body.body
  };

  db.get("posts").push(newPost).write();
  res.redirect("/posts");

});


//listen port
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})