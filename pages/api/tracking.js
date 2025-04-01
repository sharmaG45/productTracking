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
    // Fetch tracking details
    const [trackingRows] = await pool.execute(
      'SELECT * FROM trackings WHERE reference_no = ?',
      [trackingCode]
    );

    if (trackingRows.length === 0) {
      return res.status(404).json({ error: 'Tracking code not found' });
    }

    // Fetch tracking status history
    const [statusRows] = await pool.execute(
      'SELECT stage, location, timestamp, completed FROM tracking_status WHERE reference_no = ? ORDER BY timestamp ASC',
      [trackingCode]
    );

    // Construct response object
    const responseData = {
      reference_no: trackingRows[0].reference_no,
      origin: trackingRows[0].origin,
      destination: trackingRows[0].destination,
      booked_on: trackingRows[0].booked_on,
      shipping_date: trackingRows[0].shipping_date,
      status: statusRows,
    };

    console.log(responseData, "respoonsData");


    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Database Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
