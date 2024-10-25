// REQUIRED MODULES
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./database/connection");
require('dotenv').config();

require("./models/blog/blog-model");
require("./models/forum/forum");
require("./models/job");

const accountRoutes = require("./routes/user/authentication");
const userProfile = require("./routes/user/userProfile");
const subscriberRoutes = require("./routes/subscriber");
const businessRoutes = require("./routes/business");
const jobRoutes = require("./routes/job");
const eventRoutes = require("./routes/event");
const statsRoutes = require("./routes/stats/statsRoutes");

const forgotPassword = require("./routes/user/forgotPassword");

const geminiRoutes = require("./routes/gemini");

const blogRoutes = require('./routes/blog/blog');
const commentRoutes = require('./routes/blog/comment');
const likeRoutes = require('./routes/blog/like');
const alertRoutes = require('./routes/alert');
const forumRoutes = require('./routes/forum/forum');
const contactRoutes=require('./routes/contact');

const faqsRoutes = require('./routes/faqs');

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
    origin: "http://localhost:5001",
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
app.use("/events", eventRoutes);
app.use("/stats", statsRoutes);

app.use("/gemini", geminiRoutes);

app.use("/blogs", blogRoutes);
app.use("/blog/comment", commentRoutes);
app.use("/blog/like/:blogId", likeRoutes);

app.use("/alerts", alertRoutes);
app.use("/forums", forumRoutes);
app.use("/contact", contactRoutes);

app.use("/forgotpassword", forgotPassword);
app.use("/faqs", faqsRoutes);

// STARTING THE SERVER AND CONNECTING TO MONGODB
async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("An error occurred while trying to start the server:", error);
    process.exit(1);
  }
}

startServer();

// EXPORT APP
module.exports = app;
