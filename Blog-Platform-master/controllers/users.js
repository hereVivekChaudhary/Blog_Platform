const Listing=require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
const flash=require("connect-flash");

module.exports.signupForm=(req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.registered=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({email, username});
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
          if(err) {
              return next(err);
          }
          req.flash("success", "Welcome to BlogPlatform");
          res.redirect("/listing");
      });
  }  catch(e) {
      req.flash("error", e.message);
        res.redirect("/signup");
    }
  };

module.exports.loginForm=(req, res) => {
    res.render("users/login.ejs");
  };

module.exports.login=(req, res) => {
    
    req.flash("success", "Welcome Back")
   
   res.redirect('/listing');
  };

module.exports.loggedOut=(req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listing");
    })
  };