// const express = require("express");
// const router = express.Router();
// const Job = require("../models/Job");

// // Route to post a job
// router.post("/post", async (req, res) => {
//     console.log("body: ", req.body);
//   const { title, location, description, salary, requirements, employerEmail } = req.body;

// //   if (!title || !location || !description || !salary || !requirements || !employerEmail) {
// //     return res.status(400).json({ message: "All fields are required" });
// //   }

//   try {
//     const job = new Job({ title, location, description, salary, requirements, employerEmail });
//     await job.save();
//     res.status(201).json({ message: "Job posted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error posting job", error: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     const jobs = await Job.find({ employerEmail: email });
//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch jobs" });
//   }
// });

// const { getJobs } = require('../controllers/jobController');

// router.get('/', getJobs); // Ensure this is defined
// module.exports = router;


// module.exports = router;

const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const JobApplication = require('../models/JobApplication'); 

// Route to post a job
router.post("/post", async (req, res) => {
  const { title, location, description, salary, requirements, employerEmail } = req.body;

  if (!title || !location || !description || !salary || !requirements || !employerEmail) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const job = new Job({ title, location, description, salary, requirements, employerEmail });
    await job.save();
    res.status(201).json({ message: "Job posted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error: error.message });
  }
});

// Route to get jobs by employer email
router.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const jobs = await Job.find({ employerEmail: email });
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      await Job.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete job" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedJob);
    } catch (error) {
      res.status(500).json({ message: "Failed to update job" });
    }
  });
  
  
router.get("/all", async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
});

router.post('/apply', async (req, res) => {
    try {
      const { email, jobId, jobTitle, company, location, appliedAt } = req.body;
  
      if (!email || !jobId) {
        return res.status(400).json({ message: 'Email and job ID are required.' });
      }
  
      const existingApplication = await JobApplication.findOne({ email, jobId });
  
      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job.' });
      }
  
      const newApplication = new JobApplication({
        email,
        jobId,
        jobTitle,
        company,
        location,
        appliedAt,
      });
  
      await newApplication.save();
  
      res.status(201).json({ message: 'Job application submitted successfully.' });
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
// Route to fetch applied jobs by email
router.get('/applied', async (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      const appliedJobs = await JobApplication.find({ email });
      res.status(200).json(appliedJobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      res.status(500).json({ message: 'Failed to fetch applied jobs' });
    }
  });

  router.delete('/withdraw/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await JobApplication.findByIdAndDelete(id);
      res.status(200).json({ message: 'Job application withdrawn successfully.' });
    } catch (error) {
      console.error('Error withdrawing job application:', error);
      res.status(500).json({ message: 'Failed to withdraw job application.' });
    }
  });
  
module.exports = router;
