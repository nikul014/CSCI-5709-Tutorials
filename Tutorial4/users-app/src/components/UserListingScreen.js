import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import UserCard from "./UserCard";

const UserListingScreen = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://express-t4.onrender.com/api/users');
                setUsers(response.data);
            } catch (error) {
                toast.error('Error fetching users!');
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full h-screen bg-fixed" style={{backgroundImage: `url(/background_three.jpg)`}}>
            <div className="p-4 h-full overflow-y-auto bg-opacity-10 bg-white">
                <ToastContainer/>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl text-white font-bold">Users</h1>
                    <input
                        type="text"
                        className="border shadow-md rounded-lg p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredUsers.map(user => (
                        <div
                            key={user._id}
                            className="transform transition-transform duration-300 hover:scale-105 flex flex-col"
                            style={{minHeight: 'min-content'}} // Ensure each card adjusts its height
                            onClick={() => navigate(`/user-detail/${user._id}`)}
                        >
                            <UserCard user={user} className="h-full"/> {/* Ensure each card occupies full height */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserListingScreen;
