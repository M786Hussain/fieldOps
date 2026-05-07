const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);


router.get('/users', auth(['Admin', 'Client', 'Technician']), async (req, res) => {
  try {
    const users = await User.find({}).select('name email role'); 
    console.log("Database se users mile:", users); // Backend terminal mein check karein
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
