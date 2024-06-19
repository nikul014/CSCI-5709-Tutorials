import React from 'react';

const UserCard = ({ user }) => {
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="bg-white h-full border shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="relative place-items-start">
                    <div
                        className="rounded-full w-40 h-40 flex items-center justify-center mx-auto bg-white shadow-md border-4 border-amber-400">
                        <img
                            className="rounded-full p-2 object-cover w-36 h-36"
                            src={`https://picsum.photos/400?test${user.name}`}
                            alt={`${user.name}'s Profile`}
                        />
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-amber-800 mt-4 mb-2">{user.name}</h2>
                <div className="space-y-0.5">
                    <p className="text-gray-700">{user.email}</p>
                    <p className="text-gray-700">{user.phone}</p>
                    <p className="text-gray-700"><strong>Tags:</strong></p>
                    <div className="flex flex-wrap">
                        {user.tags.map(tag => (
                            <span key={tag}
                                  className="bg-amber-100 text-amber-600 border border-amber-600 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                                {capitalizeFirstLetter(tag)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
