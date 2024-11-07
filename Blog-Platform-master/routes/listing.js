const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");
const multer = require("multer");
const { resolveSoa } = require("dns");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingcontroller = require("../controllers/listings.js");

router.get("/listing", wrapAsync(listingcontroller.index));

//SHOW ROUTE

router.get("/listing/:id", wrapAsync(listingcontroller.showpage));
router.get("/listings/mypage", wrapAsync(listingcontroller.mypage));

//NEW LISTING ADD
router.get("/listings/new", isLoggedIn, listingcontroller.newForm);

router.post(
  "/listings/new/add",
  upload.single("image"),
  wrapAsync(listingcontroller.save)
);

//TO EDIT THE POST
router.get("/listings/edit/:id", wrapAsync(listingcontroller.editpage));

router.put(
  "/listing/:id/edit",
  upload.single("image"),
  wrapAsync(listingcontroller.edited)
);

//to DELETE THE DATA FROM THE LISTINGS
router.delete("/listing/delete/:id", wrapAsync(listingcontroller.destroy));

module.exports = router;
