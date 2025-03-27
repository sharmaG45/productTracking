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
            const [rows] = await db.execute("SELECT * FROM tracking ORDER BY shipping_date DESC");
            return res.status(200).json(rows);
        }

        else if (req.method === "POST") {
            // Add a new shipment
            const { tracking_code, status, type, shipping_date, shipping_cost, reference_no, origin, destination, booked_on } = req.body;

            if (!tracking_code || !status || !type || !shipping_date || !shipping_cost || !reference_no || !origin || !destination || !booked_on) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const query = `INSERT INTO tracking (tracking_code, status, type, shipping_date, shipping_cost, reference_no, origin, destination,booked_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            try {
                const [result] = await db.execute(query, [
                    tracking_code, status, type, shipping_date, shipping_cost, reference_no, origin, destination, booked_on
                ]);

                return res.status(201).json({ message: "Shipment added successfully", id: result.insertId });
            } catch (insertError) {
                console.error("Insert Query Error:", insertError);
                return res.status(500).json({ error: "Failed to insert shipment" });
            }
        }

        else if (req.method === "PUT") {
            // Update an existing shipment
            const { id, tracking_code, status, type, shipping_date, shipping_cost, reference_no, origin, destination, booked_on } = req.body;

            console.log("Update Request Body:", req.body); // Debugging Log

            if (!id || !tracking_code || !status || !type || !shipping_date || !shipping_cost || !reference_no || !origin || !destination || !booked_on) {
                return res.status(400).json({ error: "All fields are required for update" });
            }

            const query = `UPDATE tracking SET tracking_code=?, status=?, type=?, shipping_date=?, shipping_cost=?, reference_no=?, origin=?, destination=?, booked_on=?  WHERE id=?`;

            try {
                const [result] = await db.execute(query, [
                    tracking_code, status, type, shipping_date, shipping_cost, reference_no, origin, destination, booked_on, id
                ]);

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
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: "Shipment ID is required for deletion" });
            }

            try {
                const [result] = await db.execute("DELETE FROM tracking WHERE id=?", [id]);

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
