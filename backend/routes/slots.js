const express = require("express");
const router = express.Router();
const pool = require("../db"); // PostgreSQL pool connection

// Get all slots
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM slots ORDER BY id ASC");
    res.json(result.rows); // returns id, date, time, isbooked
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Book a slot
router.post("/book/:id", async (req, res) => {
  const slotId = req.params.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    // Check if slot exists and is not already booked
    const slotCheck = await pool.query(
      "SELECT * FROM slots WHERE id = $1",
      [slotId]
    );

    if (slotCheck.rows.length === 0) {
      return res.status(404).json({ error: "Slot not found" });
    }

    if (slotCheck.rows[0].isbooked) {
      return res.status(400).json({ error: "Slot already booked" });
    }

    // Insert booking
    await pool.query(
      "INSERT INTO bookings (name, email, slot_id) VALUES ($1, $2, $3)",
      [name, email, slotId]
    );

    // Mark slot as booked
    await pool.query("UPDATE slots SET isbooked = true WHERE id = $1", [slotId]);

    res.json({ message: "Slot booked successfully" });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
