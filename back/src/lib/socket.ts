import { Server } from "socket.io";
import http from "http";
import https from "https";
import express from "express";
import fs from "fs";

const app = express();
var server = http.createServer(app);
if (process.env.NODE_ENV == "production"){
  const prop = {
    key: fs.readFileSync("./client-key.pem"),
    cert: fs.readFileSync("./client-cert.pem")
  }
  server = https.createServer(prop ,app)
}

const io = new Server(server, {
  cors: {
    origin: [process.env.DOMAIN_BASE || "http://localhost:5173"],
  },
});

type UserSocketMap = {
  [key: string]: string;
};
const userSocketMap: UserSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  // console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId as string | undefined;
  if (userId) {
    userSocketMap[userId] = socket.id;
    // console.log(`User ${userId} connected with socket ID ${socket.id}`);
  }

  // Emit the list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});

io.on("disconnect", (socket) => {
  console.log("A user disconnected", socket.id);
  const userId = socket.handshake.query.userId as string | undefined;
  if (userId) {
    delete userSocketMap[userId];
    console.log(`User ${userId} disconnected`);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});


export { io, app, server };
