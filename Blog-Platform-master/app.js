if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const mongoose = require("mongoose");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const multer = require("multer");
const { resolveSoa } = require("dns");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");

const db_Url=process.env.ATLAS_URL;
async function main() {
  await mongoose.connect(db_Url);
}
main()
  .then(() => {
    console.log("Connection Succesfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, () => {
  console.log("server Start");
});

const   store=MongoStore.create({
    mongoUrl:db_Url,
    crypto:{
      secret:process.env.SECRET
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
  console.log("ERROR IN MOGNO SESSION STORE",err);
});

app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 7 * 24 * 60 * 60 * 24 * 3,
    },
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  next();
});
// User
app.use("/", users);

//MAIN PAGE OF WEB SITE
app.use("/", listings);

//REVIEWS
app.use("/", reviews);

app.all("*", (req, res) => {
  throw new ExpressError(404, "PageNot Found");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "SomeThing Went Wrong" } = err;
  res.render("error.ejs", { message });
});
