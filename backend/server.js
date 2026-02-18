const express = require('express');
const cors = require('cors');
const slotsRouter = require('./routes/slots');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/slots', slotsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
