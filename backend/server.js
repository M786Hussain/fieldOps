const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
require('dotenv').config();
const dns = require('dns');

// DNS settings for stability
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Test/Home Route (Taki "Cannot GET /" na aaye)
app.get("/", (req, res) => {
  res.status(200).json({ message: "fieldOps Backend is Live and Running!" });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

// 2. Global Error Handler (Deployment ke liye zaroori hai)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

// Local testing ke liye listen rehne dein
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Vercel ke liye export lazmi hai
module.exports = app;
