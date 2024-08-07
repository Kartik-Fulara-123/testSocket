import express from "express";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { authMiddleware } from "@thatawesomekk/single-sign-on";
import cookiesParser from "cookie-parser"

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cookiesParser());

app.use(express.static("public"));

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("codeChange", (data) => {
//     socket.broadcast.emit("codeChange", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

const PORT = process.env.PORT || 6565;

app.get("/auth", authMiddleware, (req: any, res: any) => {
  console.log(req?.user || "asdfasdfasdfasdf");

  res.status(200).json({
    success: true,
    message: "Authentication successful",
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
