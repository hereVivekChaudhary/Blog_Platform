// const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



const { authenticate } = require("passport");
const Listing=require("../models/listing.js");
const flash=require("connect-flash");
module.exports.index=(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("../views/listings/index.ejs", { allListings });
  });

module.exports.showpage=(async (req, res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate({
      path: "reviews",
      populate: {
          path: "author",
      },
  })
  .populate("owner");
    res.render("../views/listings/show.ejs", { listing });
  });

  module.exports.newForm= (req, res) => {
    res.render("../views/listings/newform.ejs");
  };
  
  module.exports.mypage = async (req, res) => {
    try {
      const currUser = req.user; // Assuming req.user contains the current user's data
      if (!currUser) {
        return res.send("User not authenticated");
      }  
      const listings = await Listing.find({ owner: currUser._id }).populate();
      res.render("listings/mypage", { listings,currUser });
    } catch (error) {
      console.error("Error fetching listings: ", error);
      res.status(500).send("An error occurred while fetching listings.");
    }
  };
  


  module.exports.save=( async(req, res, next) => {
    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.location,
        limit: 1
    })
    .send();
      
    let url = req.file.path;
    let filename = req.file.filename;
    const data = req.body;
    data.owner = req.user._id;
    data.image = {url, filename};
    
  data.geometry = response.body.features[0].geometry;
  
    await Listing.insertMany(data);
    console.log(data);
    req.flash("success", "New Blog created");
    res.redirect("/listing");
    });


    module.exports.editpage=(async (req, res) => {
        let id = req.params.id;
        let data = await Listing.findById(id);
        res.render("../views/listings/edit.ejs", { data });
      });

    module.exports.edited=(async (req, res) => {
        let {id} = req.params;
        let listing = await Listing.findById(id);
        if(!listing.owner._id.equals(res.locals.currUser._id)){
          req.flash("error", "You don't have permission to edit")
          return res.redirect(`/listing/${id}`);
        }
        const newdata = req.body;
        let data = await Listing.findByIdAndUpdate(id, newdata, { new: true });
        if(typeof req.file !== "undefined"){
          // data = await Listing.findByIdAndUpdate(id, { ...req.body.listing});
          let url = req.file.path;
          let filename = req.file.filename;
          data.image = {url, filename};
          await data.save();
          // await Listing.insertOne(data);
        }
        console.log(data); 
        req.flash("success", "Blog Updated");
      
        res.redirect(`/listing/${id}`);
        });


    module.exports.destroy=(async (req, res) => {
        const id = req.params.id;
        let data = await Listing.findByIdAndDelete(id);
        req.flash("success","Blog Deleted Succesfully");
        res.redirect("/listing");
        console.log(data);
      });

    