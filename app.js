require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const hbs = require("hbs");
const sessionConfig = require("./config/session.config");
const passport =require("passport");
const path =require("path")

require('./config/passport.config');

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use(sessionConfig);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(passport.initialize());
app.use(passport.session());

hbs.registerPartials(path.join(__dirname + "/views/partials"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const routes = require("./config/routes.config");
app.use(routes);

app.use((err, req, res, next) => {
  console.log(err)
  res.render("error", { err });
});

app.listen(3000, () => console.log("Port 3000 ready to use 🔊🔊🔊"));
