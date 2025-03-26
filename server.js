const { createServer } = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shubham@9097",
  database: "trackingApp",
});

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("track", (trackingCode) => {
    db.query("SELECT * FROM tracking WHERE tracking_code = ?", [trackingCode], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return;
      }
      if (results.length > 0) {
        socket.emit("trackingUpdate", results[0]);
      }
    });
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

httpServer.listen(4000, () => console.log("Real-time server running on port 4000"));
