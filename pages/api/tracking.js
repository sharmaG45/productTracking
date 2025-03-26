import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { trackingCode } = req.query;

  try {
    console.log("Connecting to database...");

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",  // Change if your DB username is different
      password: "Shubham@9097", // Update with your MySQL password
      database: "trackingApp",
    });

    console.log("Connected to database!");

    const [rows] = await db.execute(
      "SELECT * FROM tracking WHERE tracking_code = ?",
      [trackingCode]
    );

    await db.end();

    if (rows.length === 0) {
      console.log("Tracking code not found:", trackingCode);
      return res.status(404).json({ error: "Tracking code not found" });
    }

    console.log("Tracking Data:", rows[0]);
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Database Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
