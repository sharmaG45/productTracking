import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { trackingCode } = req.query;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM tracking WHERE tracking_code = ?',
      [trackingCode]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tracking code not found' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Database Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
