const express = require("express");
const path = require("path");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

const db = lowDb(new FileSync("db.json"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
db.defaults({ posts: [] }).write();

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/posts", (req, res) => {
  // //
  const posts = db.get("posts").value();
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const posts = db.get("posts").value();

  const body = req.body;
  console.log(body);
  const newPost = {
    id: posts.length + 1,
    title: body.title,
  };
  db.get("posts").push(newPost).write();
  res.redirect("/posts");
});

app.get("/home", (req, res) => {
  res.render("index");
});
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
