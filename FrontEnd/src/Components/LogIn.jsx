import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("fetching...");
            const response = await fetch('http://localhost:5000/api/employees/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                // alert('Login successful!');
                setFormData({ email: '', password: '' });
                console.log("Data is: ",data.employee)
                const employeeName = data.employee.name 
                const employeeMail = data.employee.email
                // console.log(employeeName,employeeMail)
                // Redirect based on role
                if (data.employee.role === 'Employer') {
                    navigate('/employee-dashboard', { state: { employeeName, employeeMail } });
                } else if (data.employee.role === 'Job Seeker') {
                    navigate('/jobseeker-dashboard', { state: { employeeName, employeeMail } });
                } else {
                    setError('Invalid user role.');
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error logging in');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Log In</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
