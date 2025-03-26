import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    let db;
    try {
        // Connect to the database
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root', // Update with your MySQL username
            password: 'Shubham@9097', // Update with your MySQL password
            database: 'trackingApp',
        });

        // Retrieve the user from the database
        const [users] = await db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = users[0];

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            'your_jwt_secret', // Replace with your own secret key
            { expiresIn: '1h' }
        );

        // Send the token to the client
        res.status(200).json({ token });
    } catch (error) {
        console.error('Database Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (db) {
            await db.end();
        }
    }
}

export default handler;