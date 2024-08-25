const express = require("express");
const cors = require("cors");

const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");

const advertising = require("./routes/advertising.js");
const userRoutes = require("./routes/usersroutes.js");
const chatRoutes = require("./routes/chatroutes.js");
const authRoutes = require("./routes/authroutes.js");
const partyRoutes1 = require("./routes/partyRoutes1.js"); //duaa
const userdata = require("./routes/userdataRoutes.js"); //duaa
const LocalList = require("./routes/LocalList.js");
const districtRoutes = require("./routes/districtRoutes.js");
const debateRoutes = require("./routes/debateRoutes.js");
const { chat_messages } = require("./models");
const adminRoutes = require("./routes/adminroutes.js");
const localListingRoutes = require("./routes/localListingRoutes.js");
const localListingRoutes1 = require("./routes/localListingRoutes1.js");
const localListingRoutes2 = require("./routes/localListingRoutes2.js");
const voteRoutes = require("./routes/voteRoutes.js");
const ResultPageRoutes = require("./routes/resultPageRoutes.js");
const ResultPageRoutesA1 = require("./routes/resultPageRoutesA1.js");
const ResultPageRoutesA2 = require("./routes/resultPageRoutesA2.js");
//
const adminloginRoutes = require("./routes/adminloginroutes.js");
const districtRoutes1 = require("./routes/districtRoutes1.js");
const partyRoutes = require("./routes/partyRoutes.js");
//sondos-------------
const PartyListing = require("./routes/PartyListing.js");
//-----------------
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Be more specific in production
    methods: ["GET", "POST"],
  },
});

require("dotenv").config();
app.use(express.json());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Make io accessible to our router
app.set("io", io);

// Token verification function
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room. Socket ID: ${socket.id}`);
  });

  socket.on("send message", async (data) => {
    try {
      console.log("Received message data:", data);
      const { userId, message, token } = data;
      const user = verifyToken(token);

      if (user) {
        console.log("User verified:", user);
        const newMessage = await chat_messages.create({
          user_id: user.id,
          message,
          is_admin: user.isAdmin || false,
        });

        console.log("New message created:", newMessage);

        // Emit to the specific user's room and to the admin room
        io.to(user.id).emit("new message", newMessage);
        io.to("admin").emit("new message", newMessage);

        console.log(`Emitted new message to user ${user.id} and admin`);
      } else {
        console.error("User verification failed");
      }
    } catch (error) {
      console.error("Error handling send message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// Routes

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advertising", advertising);
app.use("/api", advertising);
app.use("/api/LocalList", LocalList);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/PartyListing", PartyListing);
app.use("/api/debates", debateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

//
app.use("/api/district", districtRoutes);
app.use("/api/local-listings", localListingRoutes);
app.use("/api/local-listings1", localListingRoutes1);
app.use("/api/local-listings2", localListingRoutes2);
app.use("/votingresult", partyRoutes1);
app.use("/test", userdata); //duaa userdata

app.use("/api", voteRoutes);
app.use("/api", ResultPageRoutes);
app.use("/api", ResultPageRoutesA1);
app.use("/api", ResultPageRoutesA2);
app.use("/api", partyRoutes);

//
app.use("/api/admin", adminloginRoutes);
app.use("/api", districtRoutes1);

const PORT = process.env.PORT || 4026;

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);

  console.log("Environment variables:", process.env);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Application specific logging, throwing an error, or other logic here
});
