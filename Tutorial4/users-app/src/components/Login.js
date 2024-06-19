import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    const showToast = () =>
        toast.success(
            "Login successful!",
        );

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://express-t4.onrender.com/api/login', {
                username: email,
                password: password
            });

            if (response.status === 200) {
                showToast();
                setTimeout(() => {
                    navigate('/user-list');
                }, 3000);
            } else {
                toast.error(
                    "Login failed! Please verify credentials.",
                );
            }
        } catch (error) {
            toast.error(
                "Login failed! Please verify credentials.",
            );
        }
    };

    return (
        <div>
            <ToastContainer/>
            <div className="w-full h-screen flex justify-center items-center" style={{ backgroundImage: `url(/background_three.jpg)` }}>
                <div className="w-full h-full px-6 py-4 shadow-md flex flex-col-reverse lg:flex-row items-center overflow-y-auto">
                    <div className="w-full lg:w-1/2 mb-4 lg:mr-4 flex justify-center items-center">
                        <img src="/signup_side.png" alt="signup" className="w-1/2 h-1/2" />
                    </div>

                    <div className="w-full lg:w-1/2 items-center">
                        <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-2xl">
                            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Added onChange handler
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} // Added onChange handler
                                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 px-4 flex items-center"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mt-4 mb-2">
                                    <button
                                        type="submit"
                                        className="w-full px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginScreen;
