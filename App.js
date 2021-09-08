const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  session({
    secret: "secret mesage",
    saveUninitialized: true,
    resave: true,
  })
);

app.set("view engine", "ejs");
app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    res.locals.message = req.flash('message');
    res.locals.info = req.flash('info');
    next();
});
app.use(express.static("public"));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use('/css',express.static(__dirname + '/stylesheet'));
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));


app.get("/", function (req, res) {
  res.render('index');
});
app.get("/message", function (req, res) {
  req.flash("message", "message alert text");
  res.redirect("/");
});

app.get("/error", function (req, res) {
  req.flash("error","error alert text");
  res.redirect("/");
});

app.get("/success", function (req, res) {
    req.flash("success","success alert text");
    res.redirect("/");
});
app.get("/info", function (req, res) {
    req.flash("info","info alert text");
    res.redirect("/");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`App started port: ${PORT}`);
});
