import React from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../assets/wellcome.jpg'; // Replace this with your image path

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto p-6 flex flex-col md:flex-row items-center gap-8">
                {/* Left Side: Intro of Website */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h1 className="text-4xl font-bold text-blue-600">Welcome to Hiring Portal</h1>
                    <p className="text-gray-600 text-lg">
                        Your one-stop platform to explore job opportunities, connect with employers, and find the best roles that fit your career aspirations.
                    </p>

                    {/* Buttons for Register and Log In */}
                    <div className="flex space-x-4">
                        <button 
                            className="bg-blue-500 text-white text-xl px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                        <button className="bg-blue-500 text-white text-xl px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95">
                            Log In
                        </button>
                    </div>

                </div>

                {/* Right Side: Image */}
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img
                        src={welcomeImage}
                        alt="Welcome"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
