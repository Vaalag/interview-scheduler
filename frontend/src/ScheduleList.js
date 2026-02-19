import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";

const ScheduleList = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSlotId, setBookingSlotId] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await axios.get("http://localhost:5000/slots");
      setSlots(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setLoading(false);
    }
  };

  const handleBook = async (slot) => {
    console.log("Clicked slot:", slot.id);
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");

    if (!name || !email) return alert("Name and email required");

    setBookingSlotId(slot.id);
    try {
      await axios.post(`http://localhost:5000/slots/book/${slot.id}`, {
        name,
        email,
      });
      alert("Slot booked successfully!");
      fetchSlots(); // refresh slots after booking
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to book slot");
    } finally {
      setBookingSlotId(null);
    }
  };

  if (loading) {
    return <CircularProgress style={{ display: "block", margin: "50px auto" }} />;
  }

  return (
    <Grid container spacing={4}>
      {slots.map((slot) => (
        <Grid item xs={12} md={4} key={slot.id}>
          <Card
            style={{
              padding: "15px",
              borderRadius: "15px",
              background: slot.isbooked ? "#ffe6e6" : "#e6f7ff", // ✅ updated field
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              transition: "0.3s",
              cursor: slot.isbooked ? "not-allowed" : "pointer",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                📅 {new Date(slot.date).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1">⏰ {slot.time}</Typography>

              <Chip
                label={slot.isbooked ? "Booked" : "Available"} // ✅ updated field
                color={slot.isbooked ? "error" : "primary"}
                onClick={() => !slot.isbooked && handleBook(slot)} // ✅ updated field
                style={{
                  marginTop: "10px",
                  cursor: slot.isbooked ? "not-allowed" : "pointer",
                }}
              />

              {bookingSlotId === slot.id && (
                <Typography
                  variant="body2"
                  style={{ marginTop: "10px", fontStyle: "italic" }}
                >
                  Booking...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ScheduleList;
