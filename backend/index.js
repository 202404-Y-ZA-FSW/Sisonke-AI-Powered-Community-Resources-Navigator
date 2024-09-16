// REQUIRED MODULES
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./database/connection");


const accountRoutes = require("./routes/user/authentication");
const userProfile = require("./routes/user/userProfile");
const subscriberRoutes = require("./routes/subscriber");
const businessRoutes = require("./routes/business");
const jobRoutes = require("./routes/job");

const blogRoutes = require('./routes/blog/blog');
const commentRoutes = require('./routes/blog/comment');
const likeRoutes = require('./routes/blog/like');
const alertRoutes=require('./routes/alert');

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
app.use("/account", accountRoutes);
app.use("/profile", userProfile);
app.use("/newsletter", subscriberRoutes);
app.use("/business", businessRoutes);
app.use("/jobs", jobRoutes);

app.use("/blogs", blogRoutes);
app.use("/blog/comment/:blogID", commentRoutes);
app.use("/blog/like/:blogID", likeRoutes);

app.use("/alerts", alertRoutes);

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
