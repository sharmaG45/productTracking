const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:3000" },
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

// User login
app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(401).json({ error: "User not found" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token, role: user.role });
    }
  );
});

// Fetch tracking details
app.get("/api/tracking", (req, res) => {
  const { trackingCode } = req.query;
  db.query(
    "SELECT * FROM tracking WHERE tracking_code = ?",
    [trackingCode],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).json({ error: "Tracking code not found" });

      res.json({ trackingCode, events: results });
    }
  );
});

// Admin routes
app.post("/api/admin/add", (req, res) => {
  const { trackingCode, status, location, timestamp } = req.body;
  db.query(
    "INSERT INTO tracking (tracking_code, status, location, timestamp) VALUES (?, ?, ?, ?)",
    [trackingCode, status, location, timestamp],
    (err, result) => {
      if (err) return res.status(500).send(err);
      io.emit("trackingUpdate", { trackingCode, status, location, timestamp });
      res.json({ message: "Shipment added successfully" });
    }
  );
});

server.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
