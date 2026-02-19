import React from "react";
import { Container, Typography } from "@mui/material";
import ScheduleList from "./ScheduleList";

function App() {
  return (
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold" }}
      >
        Interview Scheduler Dashboard
      </Typography>

      <ScheduleList />
    </Container>
  );
}

export default App;
