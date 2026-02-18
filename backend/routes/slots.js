const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===============================
   GET ALL SLOTS
   =============================== */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM slots ORDER BY date, start_time"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

/* ===============================
   BOOK A SLOT
   =============================== */
router.post("/book", async (req, res) => {
  const { name, email, slot_id } = req.body;

  if (!name || !email || !slot_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if slot already booked
    const slotCheck = await pool.query(
      "SELECT is_booked FROM slots WHERE id = $1",
      [slot_id]
    );

    if (slotCheck.rows.length === 0) {
      return res.status(404).json({ error: "Slot not found" });
    }

    if (slotCheck.rows[0].is_booked) {
      return res.status(400).json({ error: "Slot already booked" });
    }

    // Insert booking
    await pool.query(
      "INSERT INTO bookings (name, email, slot_id) VALUES ($1, $2, $3)",
      [name, email, slot_id]
    );

    // Update slot as booked
    await pool.query(
      "UPDATE slots SET is_booked = TRUE WHERE id = $1",
      [slot_id]
    );

    res.json({ message: "Slot booked successfully" });

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;
