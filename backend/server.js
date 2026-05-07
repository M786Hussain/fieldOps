const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
require('dotenv').config();
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;