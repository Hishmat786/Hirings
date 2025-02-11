import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch all jobs from the API
    axios
      .get("http://localhost:5000/api/jobs/all")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Job Dashboard</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition-shadow duration-300"
          >
            <div>
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-gray-600">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-600">
                <strong>Description:</strong> {job.description}
              </p>
              <p className="text-gray-600">
                <strong>Salary:</strong> {job.salary}
              </p>
              <p className="text-gray-600">
                <strong>Requirements:</strong> {job.requirements}
              </p>
              <p className="text-gray-600">
                <strong>Posted by:</strong> {job.employerEmail}
              </p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
