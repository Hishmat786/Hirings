const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  jobId: { type: String, required: true },
  jobTitle: String,
  company: String,
  location: String,
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
