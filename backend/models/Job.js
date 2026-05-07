const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Assigned', 'In-Progress', 'Completed'], 
    default: 'Pending' 
  },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scheduledDate: { type: Date },
  updates: [{
    note: String,
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
