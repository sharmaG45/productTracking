import mysql from "mysql2/promise";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export default async function handler(req, res) {
    let db;

    try {
        db = await mysql.createConnection(dbConfig);

        if (req.method === "GET") {
            // Fetch all shipments
            const [rows] = await db.execute("SELECT * FROM trackings ORDER BY shipping_date DESC");
            return res.status(200).json(rows);
        }

        else if (req.method === "POST") {
            // Add a new shipment
            const { reference_no, origin, destination, booked_on, shipping_date } = req.body;

            if (!reference_no || !origin || !destination || !booked_on || !shipping_date) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const query = `INSERT INTO trackings (reference_no, origin, destination, booked_on, shipping_date) VALUES (?, ?, ?, ?, ?)`;

            try {
                await db.execute(query, [reference_no, origin, destination, booked_on, shipping_date]);
                return res.status(201).json({ message: "Shipment added successfully" });
            } catch (insertError) {
                console.error("Insert Query Error:", insertError);
                return res.status(500).json({ error: "Failed to insert shipment" });
            }
        }

        else if (req.method === "PUT") {
            // Update an existing shipment
            const { reference_no, origin, destination, booked_on, shipping_date } = req.body;

            if (!reference_no || !origin || !destination || !booked_on || !shipping_date) {
                return res.status(400).json({ error: "All fields are required for update" });
            }

            const query = `UPDATE trackings SET origin=?, destination=?, booked_on=?, shipping_date=? WHERE reference_no=?`;

            try {
                const [result] = await db.execute(query, [origin, destination, booked_on, shipping_date, reference_no]);

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "Shipment not found or no changes made" });
                }

                return res.status(200).json({ message: "Shipment updated successfully" });
            } catch (updateError) {
                console.error("Update Query Error:", updateError);
                return res.status(500).json({ error: "Failed to update shipment" });
            }
        }

        else if (req.method === "DELETE") {
            // Delete a shipment
            const { reference_no } = req.query;

            if (!reference_no) {
                return res.status(400).json({ error: "Reference number is required for deletion" });
            }

            try {
                const [result] = await db.execute("DELETE FROM trackings WHERE reference_no=?", [reference_no]);

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "Shipment not found" });
                }

                return res.status(200).json({ message: "Shipment deleted successfully" });
            } catch (deleteError) {
                console.error("Delete Query Error:", deleteError);
                return res.status(500).json({ error: "Failed to delete shipment" });
            }
        }

        else {
            return res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (db) await db.end();
    }
}
