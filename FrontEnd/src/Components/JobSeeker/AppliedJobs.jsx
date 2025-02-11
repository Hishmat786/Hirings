import React, { useEffect, useState } from 'react';

function AppliedJobs({ employeeMail }) {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (!employeeMail) {
      alert('User email is required to fetch applied jobs.');
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/applied?email=${employeeMail}`);
        const data = await response.json();
        setAppliedJobs(data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, [employeeMail]);

  // Handle withdrawal of job application
  const handleWithdraw = async (jobId) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/withdraw/${jobId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setAppliedJobs(appliedJobs.filter(job => job._id !== jobId));
          alert('Application successfully withdrawn.');
        } else {
          alert('Failed to withdraw application.');
        }
      } catch (error) {
        console.error('Error withdrawing job application:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Applied Jobs for {employeeMail}</h1>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied for yet.</p>
      ) : (
        appliedJobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded-lg shadow-md mb-4 flex justify-between bg-white"
          >
            <div>
              <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
              <p className="text-gray-700 mt-1">
                <strong>Applied At:</strong> {new Date(job.appliedAt).toLocaleString()}
              </p>
              
            <button
              onClick={() => handleWithdraw(job._id)}
              className="bg-red-500 text-white px-4 py-1 mt-2 rounded-lg hover:bg-red-600"
            >
              Withdraw
            </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AppliedJobs;
