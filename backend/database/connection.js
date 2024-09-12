// REQUIRED PACKAGE
const mongoose = require("mongoose");

// CONNECTING TO MONGODB
async function connectToMongoDB() {
  const connection =
    "mongodb+srv://Geraldmutswi:Geraldmutswi1995@gerald.zevqy.mongodb.net/?retryWrites=true&w=majority&appName=gerald";
  try {
    await mongoose.connect(connection);
    console.log("Successfully Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// EXPORTING THE CONNECTION FUNCTION
module.exports = { connectToMongoDB };