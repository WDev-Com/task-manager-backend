const mongoose = require("mongoose");
require("dotenv").config();
const mongouri = process.env.MONGO_URI;

mongoose.connect(mongouri);

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});
const conn = mongoose.connection;

let bucket; //creating bucket and connecting

conn.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db_uri = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db_uri, {
    bucketName: "newBucket",
  });
  console.log("MongoDB Server Is Connected");
  console.log("Conntected To Bucket : ", bucket["s"]["options"].bucketName);
});

conn.on("error", (err) => {
  console.error("MongoDB Connection Error: ", err);
});

conn.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});
// Export the bucket function
module.exports = { conn, getBucket: () => bucket };
