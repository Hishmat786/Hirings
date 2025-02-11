import React, { useEffect, useState } from 'react';

function ApplyForJobs({ employeeMail }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortSalary, setSortSalary] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs/all');
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    // Apply title filter
    if (filterTitle) {
      filtered = filtered.filter(job => job.title.toLowerCase().includes(filterTitle.toLowerCase()));
    }

    // Apply location filter
    if (filterLocation) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes(filterLocation.toLowerCase()));
    }

    // Apply salary sorting
    if (sortSalary) {
      filtered.sort((a, b) => sortSalary === 'asc' ? a.salary - b.salary : b.salary - a.salary);
    }

    setFilteredJobs(filtered);
  }, [filterTitle, filterLocation, sortSalary, jobs]);

  const handleApply = async (job) => {
    if (!employeeMail) {
      alert('User email is required to apply for jobs.');
      return;
    }

    const appliedJob = {
      email: employeeMail,
      jobId: job._id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      appliedAt: new Date(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/jobs/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appliedJob),
      });

      if (response.ok) {
        alert(`Successfully applied for the job as ${employeeMail}!`);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error applying for the job.');
      }
    } catch (error) {
      console.error('Error applying for the job:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>

      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Filter by Title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by Location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={sortSalary}
          onChange={(e) => setSortSalary(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort by Salary</option>
          <option value="asc">Salary: Low to High</option>
          <option value="desc">Salary: High to Low</option>
        </select>
      </div>

      {/* Job Listing */}
      {filteredJobs.length === 0 ? (
        <p>No jobs available based on the current filters.</p>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded-lg shadow-md mb-4 flex flex-col justify-between bg-white"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-gray-700 mt-1">
              <strong>Description:</strong> {job.description}
            </p>
            <p className="text-gray-700 mt-1">
              <strong>Salary:</strong> ${job.salary}
            </p>
            <p className="text-gray-700 mt-1">
              <strong>Requirements:</strong> {job.requirements}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 self-start"
              onClick={() => handleApply(job)}
            >
              Apply
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ApplyForJobs;
