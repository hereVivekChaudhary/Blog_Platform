const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blogss");
 }
 main()
 .then(()=>{
     console.log("Connection Succesfull");
 })
 .catch((err)=>{
     console.log(err);
 })

//  const initDB=async()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany(initdata.data);
//     console.log("DATA INITIALIZED");
//  }

 initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner: "6627513633721dfee6c443c0"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
 

// initDB();  