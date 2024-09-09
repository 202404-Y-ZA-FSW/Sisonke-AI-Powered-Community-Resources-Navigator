// REQUIRED MODULES
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./database/connection");

// IMPORT ROUTES


// PORT
const port = 5000;

// EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS FOR FRONTEND ACCESS TO THIS SERVER
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ROUTES


// STARTING THE SERVER AND CONNECTING TO MONGODB
async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("An error occured while trying to start the server:", error);
    process.exit(1);
  }
}
startServer();

// EXPORT APP
module.exports = app;