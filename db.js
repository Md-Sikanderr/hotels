const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/hotels";
// const URI =
//   "mongodb+srv://mdsikander:sikanderkhan@cluster0.necm79u.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successfull");
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(0);
  }
};

module.exports = connectDB;
