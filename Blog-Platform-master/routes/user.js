const express=require("express");
const router=express.Router(); 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User=require("../models/user.js");
const listingcontroller=require("../controllers/users.js")



router.get("/signup",listingcontroller.signupForm);
  
router.post("/signup",listingcontroller.registered);
  
router.get("/login",listingcontroller.loginForm);
  
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), 
  listingcontroller.login
  );
  
router.get("/logout",listingcontroller.loggedOut)
  
module.exports=router;