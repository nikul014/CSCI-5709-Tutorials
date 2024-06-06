import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    return (
        <div className="min-h-screen flex justify-center items-center">
            <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover">
                <source src="video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 z-10">
                <h2 className="text-2xl font-bold mb-5 text-center">Profile Page</h2>
                <p><strong>First Name:</strong> {formData?.firstName}</p>
                <p><strong>Last Name: </strong> {formData?.lastName}</p>
                <p><strong>Email:     </strong> {formData?.email}</p>
            </div>
        </div>
    );
};

export default Profile;
