const express = require("express");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const session = require("express-session");

const Employee = require("../db/entity/Employee");
const allChatRouter = require("./router/allChat.router");
const employeeIdRouter = require("./router/employeeId.router");
const chatRouter = require("./router/chat.router");
const groupRouter = require("./router/group.router");
const logoutRouter = require("./router/logout.router");
const registerRouter = require("./router/register.router");
const positionRouter = require("./router/position.router");

//const loginRouter = require("./router/login.router");
//const logoutRouter = require("./router/logout.router");
//const registerController = require("./router/register.router");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
      maxAge: 1000 * 1000,
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const employee = await Employee.findOne({ where: { id: username } });
    if (employee === null) {
      return done(null, false);
    }
    if (!employee.authenticate(password)) {
      return done(null, false);
    }
    return done(null, employee);
  })
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

app.get("/", (req, res) => {
  console.log("GET /");
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/groups",
    failureRedirect: "/login",
  })
);

app.get("/sample", (req, res) => {
  if (typeof req.session.passport !== "undefined") {
    res.send(req.session.passport.user.id);
  }
  res.send("nothing");
});

app.use(chatRouter);
app.use(groupRouter);

app.use(allChatRouter);
app.use(employeeIdRouter);

app.use(logoutRouter);
app.use(registerRouter);

app.use(positionRouter);

/*
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerController);

app.get("/", (req, res) => {
  console.log("GET /");
    res.redirect("/groups");
});
*/

module.exports = app;
