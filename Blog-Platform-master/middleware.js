const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/expressError.js");
const passport=require("passport")



module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if(!req.isAuthenticated()) {
        
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create Blog!");
        return res.redirect("/login");
    }
    next();
}
