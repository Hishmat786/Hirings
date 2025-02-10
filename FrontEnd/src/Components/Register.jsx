import React, { useState } from 'react';
import Navbar from './Navbar';
import ri from '../assets/registerjpg.avif';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setError(''); // Clear error if validation passes

        try {
            const response = await fetch('http://localhost:5000/api/employees/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                }),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                alert('Registration successful!');
                setFormData({ name: '', email: '', password: '', confirmPassword: '', role: '' });
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error registering employee');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="flex w-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Left Image Section */}
                    <div className="w-1/2 bg-cover  bg-center" style={{ backgroundImage: ri }}>
                        <img
                            src={ri}
                            alt="Welcome"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right Form Section */}
                    <div className="w-1/2 p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Employer"
                                        checked={formData.role === 'Employer'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Employer
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Job Seeker"
                                        checked={formData.role === 'Job Seeker'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Job Seeker
                                </label>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;
