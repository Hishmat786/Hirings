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

module.exports = router;
