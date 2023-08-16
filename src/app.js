//3 things for tomorrow:
//1. only one row per user in live_scoreboard
//2. increment score
//3. the live scoreboard should be rendered on the student page when returning to the page without refreshing
require("dotenv").config();
const path = require("path");
const RedisStore = require("connect-redis").default;
const redis = require("./redis");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const plrRoutes = require("./routes/routes");
const { getLiveScoreWithName, updateLiveScore } = require("./models/students");

const port = process.env.PORT || 3000;

//middleware for parsing incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

// Initialize store
let redisStore = new RedisStore({
  client: redis,
  prefix: "session:",
});

//middleware for parsing cookies
app.use(cookieParser());

// Set up session middleware
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      name: "session",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("frontend"));
app.use("/", plrRoutes);

// Socket.io setup
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let socketToUser = {};
let connectedUsers = [];

// async function handleGetNames(socket) {
//   const userId = socketToUser[socket.id];
//   const names = await getName();
//   socket.emit("names", names);
// }

io.on("connection", (socket) => {
  socket.on("user connected", (userId, studentId) => {
    console.log("user connected", socket.id, userId, studentId); // Add logging here
    socketToUser[socket.id] = { userId: userId, studentId: studentId};
    connectedUsers.push(userId);
    io.emit("connected users", connectedUsers);
  });

  socket.on("score update", async (scoreData) => {
    console.log("socketToUser", socketToUser);
    console.log("score update", socket.id, socketToUser[socket.id]?.userId); // Using optional chaining here
    let userInfo = socketToUser[socket.id];
    if (userInfo) {
      // Add check to avoid throwing error
      await updateLiveScore(
        userInfo.userId,
        userInfo.studentId,
        scoreData.score,
        scoreData.assessmentId
      );

      const liveScores = await getLiveScoreWithName();
      io.emit("score update", {
        id: socket.userId,
        scoreData: liveScores,
      });
    } else {
      console.log("No user info for socket id", socket.id); // Add logging here
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnect", socket.id, socketToUser[socket.id]?.userId); // Using optional chaining here
    let userInfo = socketToUser[socket.id];
    if (userInfo) {
      // Add check to avoid throwing error
      connectedUsers = connectedUsers.filter((id) => id !== userInfo.userId);
      delete socketToUser[socket.id];
      io.emit("users connected", connectedUsers);
    } else {
      console.log("No user info for socket id", socket.id); // Add logging here
    }
  });
});
