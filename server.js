const express = require("express");
const cors = require("cors");
const path = require("path");
const expressSession = require("express-session");
const logger = require("./services/logger.service");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  // eslint-disable-next-line no-undef
  cloud_name: process.env.CLOUD_NAME, // הכנס את שם הענן שלך
  // eslint-disable-next-line no-undef
  api_key: process.env.CLOUD_API_KEY, // הכנס את מפתח ה-API שלך
  // eslint-disable-next-line no-undef
  api_secret: process.env.CLOUD_API_SECRET, // הכנס את המפתח הסודי שלך
});

const app = express();
const http = require("http").createServer(app);

require("dotenv").config();

const session = expressSession({
  secret: "secret session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(session);
app.use(express.json());
app.use(express.static("public"));
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line no-undef
  app.use(express.static(path.resolve(__dirname, "public"))); // Serve React App
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://localhost:19006",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const postRoutes = require("./api/post/post.routes");
const commentRoutes = require("./api/comment/comment.routes");
const chatRoutes = require("./api/chat/chat.routes");
const activityRoutes = require("./api/activity/activity.routes");
const cloudinaryRoutes = require("./api/cloudinary/cloudinary.routes");
const { connectSockets } = require("./services/socket.service");

const setupAsyncLocalStorage = require("./middlewares/setupAls.middleware");

app.all("*", setupAsyncLocalStorage);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

connectSockets(http, session);

module.exports = app; // for testing

app.get("/**", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3030;
http.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
