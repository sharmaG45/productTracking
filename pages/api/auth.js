import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [users] = await connection.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}








// 


// import mysql from "mysql2/promise";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required" });
//     }

//     let connection;

//     try {
//         connection = await mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//         });

//         // Check if user exists
//         const [users] = await connection.execute(
//             "SELECT * FROM user WHERE email = ?",
//             [email]
//         );

//         let user;

//         if (users.length === 0) {
//             // Insert an admin user if no user is found
//             const hashedPassword = await bcrypt.hash(password, 10);

//             await connection.execute(
//                 "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)",
//                 ["Admin", email, hashedPassword, "admin"]
//             );

//             // Fetch the newly inserted user
//             const [newUser] = await connection.execute(
//                 "SELECT * FROM user WHERE email = ?",
//                 [email]
//             );

//             user = newUser[0];
//         } else {
//             user = users[0];
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }

//         // Generate token
//         const token = jwt.sign(
//             { id: user.id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         return res.status(200).json({ token, role: user.role });
//     } catch (error) {
//         console.error("Database Error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     } finally {
//         if (connection) {
//             await connection.end();
//         }
//     }
// }

