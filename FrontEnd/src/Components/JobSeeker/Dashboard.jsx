import React, { useEffect, useState } from 'react';

function Dashboard({ employeeMail }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from an API or database
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs/all'); // Replace with your actual API endpoint
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (job) => {
    if (!employeeMail) {
      alert('User email is required to apply for jobs.');
      return;
    }

    const appliedJob = {
      email: employeeMail,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      appliedAt: new Date(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appliedJob),
      });

      if (response.ok) {
        alert('Successfully applied for the job!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error applying for the job.');
      }
    } catch (error) {
      console.error('Error submitting job application:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
                <p className="text-gray-700 mt-1"><strong>Description:</strong> {job.description}</p>
                <p className="text-gray-700 mt-1"><strong>Salary:</strong> ${job.salary}</p>
                <p className="text-gray-700 mt-1"><strong>Requirements:</strong> {job.requirements}</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
                    onClick={() => handleApply(job)}
                >
                    Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
