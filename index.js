
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./api/routes/user.route.js"
import auth from "./api/routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRouter from "./api/routes/post.route.js";
import messageRouter from "./api/routes/message.route.js";
import conversationRoute from "./api/routes/conversation.route.js";
import notificatonRoute from "./api/routes/notification.route.js";

import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cookieParser());

const expressServer = http.createServer(app);


//Handling CORS origin
if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: [
        "http://localhost:3000", 
        "http://localhost:5173",
        "https://tasklink-7vff.onrender.com",
      ],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "https://tasklink-7vff.onrender.com",
      credentials: true,
    })
  );
}


const PORT = 3000;

// Connect to the database
async function main() {
  try {
    await mongoose.connect("mongodb+srv://deepravikaif:Gp82tq1eBlSVdp8a@cluster0.gks3k.mongodb.net/tasklink", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
}

main().catch((err) => console.log("Uncaught error:", err));

//console.log("genius");
// Starting the server
expressServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", auth);
app.use("/api/posts", postRouter);
app.use("/api/message", messageRouter);
app.use("/api/conversation", conversationRoute);
app.use("/api/notification", notificatonRoute);

//============== Deployment==============//

// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   const staticFilesPath = path.join(__dirname, "client", "dist");
//   app.use(express.static(staticFilesPath));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(staticFilesPath, "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("api listing...");
//   });
// }
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,"/client/dist")));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,"client","dist","index.html"));
})

//============== Deployment==============//

// Handle middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});






//----------------------------Handling Socket.io ------------------------------//

//Handling CORS origin
export const io = new Server(expressServer, {
  cors: {
    origin: [
      "http://localhost:3000",           // For local development
      "http://localhost:5173",           // If using Vite locally
      "https://tasklink-7vff.onrender.com", // Production frontend
    ],
    credentials: true, // Allow cookies/auth headers
    methods: ["GET", "POST"], // Specify allowed methods
  },
});








io.on("connection", (socket) => {
  console.log(`socket connected with ${socket.id}`);

  //=======Messaging Feature Here ======//
  socket.on("join_room", (chatId) => {
    socket.join(chatId);
  });

  socket.on("send_message", (data) => {
    socket.to(data.chatId).emit("receive_message", data);
    socket.broadcast.emit(`${data.to}`, data);
  });

  socket.on("disconnect", (data) => {
    console.log(`user disconnected successfully ${socket.id}`);
  });
});











