// REQUIRED MODULES
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./database/connection");

// IMPORT ROUTES
const userAuthentication = require('./routes/user/authentication');
const userProfile = require('./routes/user/userProfile');
const blogRoute = require('./routes/blog/blog');
const commentRoutes = require('./routes/blog/comment');
const likeRoutes = require('./routes/blog/like');
const alertRoutes=require('./routes/alert');
const forumRoutes = require('./routes/forum/forum'); 

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
app.use('/authentication', userAuthentication);
app.use('/profile', userProfile);
app.use('/blogs', blogRoute);
app.use('/blogs/:blogId/comments',commentRoutes);
app.use('/blogs/:blogId', likeRoutes);
app.use('/alerts', alertRoutes);
app.use('/forum', forumRoutes);
// STARTING THE SERVER AND CONNECTING TO MONGODB
async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(Server is running on port ${port});
    });
  } catch (error) {
    console.error("An error occured while trying to start the server:", error);
    process.exit(1);
  }
}
startServer();

// EXPORT APP
module.exports = app;