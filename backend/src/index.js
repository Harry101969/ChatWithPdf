// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/database.js";
// import { initPinecone } from "./config/pinecone.js";
// import { createRouter } from "./routes/index.js";
// import { UploadController } from "./controllers/uploadController.js";
// import { ChatController } from "./controllers/chatController.js";

// dotenv.config();

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   })
// );
// app.use(express.json());

// async function startServer() {
//   try {
//     await connectDB();
//     const pinecone = await initPinecone();
//     const index = pinecone.Index(process.env.PINECONE_INDEX);
//    console.log("Pinecone initialized successfully!");
//     const uploadController = new UploadController(index, io);
//     const chatController = new ChatController(index);

//     app.use("/api", createRouter(uploadController, chatController));

//     io.on("connection", (socket) => {
//       console.log("Client connected");
//       socket.on("disconnect", () => console.log("Client disconnected"));
//     });

//     const PORT = process.env.PORT || 3004;
//     httpServer.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// }

// startServer();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const { initPinecone } = require("./config/pinecone");
const { createRouter } = require("./routes/index");
const { UploadController } = require("./controllers/uploadController");
const { ChatController } = require("./controllers/chatController");

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

async function startServer() {
  try {
    await connectDB();
    const pinecone = await initPinecone();
    const index = pinecone.Index(process.env.PINECONE_INDEX);
    console.log("Pinecone initialized successfully!");
    const uploadController = new UploadController(index, io);
    const chatController = new ChatController(index);

    app.use("/api", createRouter(uploadController, chatController));

    io.on("connection", (socket) => {
      console.log("Client connected");
      socket.on("disconnect", () => console.log("Client disconnected"));
    });

    const PORT = process.env.PORT || 3004;
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
