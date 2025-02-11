import React, { useState } from "react";

function PostJobForm({ employerEmail }) {
    console.log(employerEmail)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    requirements: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/jobs/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, employerEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Job posted successfully!");
        setFormData({ title: "", location: "", description: "", salary: "", requirements: "" });
      } else {
        setMessage(data.message || "Error posting job");
      }
    } catch (error) {
      setMessage("Error posting job");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="requirements"
          placeholder="Job Requirements"
          value={formData.requirements}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
          Post Job
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}

export default PostJobForm;
