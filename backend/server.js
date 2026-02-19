const express = require("express");
const cors = require("cors");
const slotsRoute = require("./routes/slots");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/slots", slotsRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get('/', (req, res) => {
  res.send('Backend is running');
});
