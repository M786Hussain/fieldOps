const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Job = require('../models/Job');


router.post('/', auth(['Admin']), async (req, res) => {
  try {
    const { title, description, clientId, technicianId, scheduledDate } = req.body;
    const newJob = new Job({
      title, description, client: clientId, technician: technicianId, scheduledDate
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


router.get('/', auth(['Admin', 'Technician', 'Client']), async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'Technician') query = { technician: req.user.id };
    if (req.user.role === 'Client') query = { client: req.user.id };
    
    const jobs = await Job.find(query).populate('client technician', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


router.patch('/:id/status', auth(['Admin', 'Technician']), async (req, res) => {
  try {
    const { status, note } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    job.status = status;
    if (note) job.updates.push({ note });
    
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
