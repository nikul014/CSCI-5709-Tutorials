import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import {toast} from "react-toastify";

const UserDetailScreen = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://express-t4.onrender.com/api/users/${id}`);
                setUser(response.data);
            }catch (error) {
                toast.error('Something went wrong! Please try to open user again.');
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (

        <div className="w-full h-screen bg-fixed" style={{backgroundImage: `url(/background_three.jpg)`}}>
            <div className="p-8 h-full overflow-y-auto bg-opacity-10 bg-white">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden relative">
                    {/* Profile Image */}
                    <div className="relative place-items-start">
                        <div
                            className="rounded-full w-40 h-40 flex items-center justify-center mx-auto bg-white shadow-md border-4 border-amber-300">
                            <img
                                className="rounded-full p-2 object-cover w-36 h-36"
                                src={`https://picsum.photos/400?test${user.name}`}
                                alt={`${user.name}'s Profile`}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-amber-800 mb-4">{user.name}</h2>
                        <div className="space-y-2">
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
                            <p><strong>Eye Color:</strong> {user.eyeColor}</p>
                            <p><strong>Favorite Fruit:</strong> {user.favoriteFruit}</p>
                            <p><strong>Tags:</strong></p>
                            <div className="flex flex-wrap">
                                {user.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-amber-100 text-amber-600 border border-amber-600 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                                    >
                                {capitalizeFirstLetter(tag)}
                            </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-pink-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h2>
                    <div className="space-y-2">
                        <p className="text-gray-700">{user.greeting}</p>
                        <p><strong>About:</strong> {user.about}</p>
                        <p><strong>Registered:</strong> {new Date(user.registered).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="bg-orange-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-orange-800 mb-4">Address and Company details</h2>
                    <div className="space-y-2">
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Latitude:</strong> {user.latitude}</p>
                        <p><strong>Longitude:</strong> {user.longitude}</p>
                        <p><strong>Company:</strong> {user.company}</p>
                        <p><strong>Balance:</strong> {user.balance}</p>
                    </div>
                </div>

                <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Friends</h2>
                    <ul className="list-disc list-inside">
                        {user.friends.map(friend => (
                            <li key={friend.id} className="text-gray-700">{friend.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
</div>    );
};

export default UserDetailScreen;
