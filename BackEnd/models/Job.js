const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  salary: Number,
  requirements: String,
  employerEmail: String, // Add employer email to associate the job post
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
