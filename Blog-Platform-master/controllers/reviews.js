const Listing=require("../models/listing.js");
const Review = require("../models/review.js");
const flash=require("connect-flash");

module.exports.addReview=async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user.id;
    listing.reviews.push(newReview);  
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    console.log("new review saved");
    res.redirect(`/listing/${listing._id}`);
  };

module.exports.destroy= async(req, res)=>{
    const {id, id1} = req.params;
    await Listing.findByIdAndUpdate(id1,{$pull:{reviews:id}})
    await Review.findByIdAndDelete(id);
  
    res.redirect(`/listing/${id1}`)
  };

  module.exports.editcomment=(async (req, res) => {
    let id = req.params.id;
    let id2=req.params.id2;
    let data = await Review.findById(id);
    res.render("../views/listings/commentedit.ejs", { data,id2 });
  });

  module.exports.editcommented = async (req, res) => {
    let id = req.params.id;
    let id2=req.params.id2;
    let updatedComment = req.body.comment;
    let data = await Review.findByIdAndUpdate(id, { comment: updatedComment }, { new: true });
    req.flash("success","Comment Edited Succecfully");  
    res.redirect(`/listing/${id2}`);
  };