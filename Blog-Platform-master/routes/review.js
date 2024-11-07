const express=require("express");
const router=express.Router(); 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");
const listingcontroller=require("../controllers/reviews.js")


//POST ROUTE
router.post("/listings/:id/reviews",listingcontroller.addReview);
  
router.delete("/review/:id/:id1",listingcontroller.destroy);
router.get("/review/:id/edit/:id2",listingcontroller.editcomment);
router.post("/review/:id/edited/:id2",listingcontroller.editcommented);

module.exports=router;