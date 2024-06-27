var express = require('express');
var router = express.Router();
const userModel = require("./users");
const orderModel = require("./batch");
const passport = require('passport');
const localStrategy = require("passport-local");
const { use } = require('passport');
const feedbackModel = require('./feedback');
const contactModel = require('./contact');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */


router.get('/', async function (req, res, next) {
  res.render('index');

});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  if(user.password==='Sachin@12345'){
    res.render('profile2');
  }else{
    res.render('profile', { user });
  }
  
});

// here i difine login router
router.get('/login', async function (req, res, next) {
  res.render('login', { error: req.flash('error') });
});
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}), function (req, res) { })

//  here i difine register router
router.get('/register', function (req, res, next) {
  const finduser = null;
  res.render('register', { finduser });
});
router.post("/register", async function (req, res) {
  const finduser = await userModel.findOne({ username: req.body.username });
  if (finduser != null) {
    if (finduser.username == req.body.username) {
      res.render("register", { finduser });
    }
  }
  else {
    var userdata = new userModel({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      phoneno: req.body.phoneno
    });
    userModel.register(userdata, req.body.password).then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      })
    })
  }
});
// here i digine logout router
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/")
  });
});


// here a function to give feedback
router.get('/feedback', isLoggedIn, function (req, res) {
  res.render("feedback");
});
router.post("/feedback", async function (req, res, next) {
  const feedback = await feedbackModel.create({
    name: req.body.name,
    phone: req.body.phone,
    feed: req.body.feed
  })
  res.redirect('/')
})


// here a function to contact us
router.get('/contact', isLoggedIn, function (req, res) {
  res.render("contact");
});
router.post("/contact", async function (req, res, next) {
  const contact = await contactModel.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    msg: req.body.msg
  })
  res.redirect('/')
})

// here a functionto send about page
router.get('/about', function (req, res) {
  res.render("about");
});



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
