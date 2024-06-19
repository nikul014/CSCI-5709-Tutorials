# Tutorial 4

* *Date Created*: 19 June 2024
* *Last Modification Date*: 19 June 2024
* *Website URL*: <https://tutorial4-advance-web-development.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/nkukadiya/CSCI-5709-Tutorials/-/tree/main/Tutorial4?ref_type=heads>

## Authors

* Nikulkumar Kukadiya (nk865270@dal.ca)

## Deployment

The project code available in the Tutorial4 directory was pushed to Github and then using the Netlify deployment deployed to the server.

Steps of Deployment:
1. Upload your code to the main branch of the GitHub repository.
2. Retrieve the Tutorial3 project from GitHub and import it into Netlify.
3. Configure the build settings using npm run build and adjust the publish directory for deploying the application.
4. Access the live application at https://tutorial4-advance-web-development.netlify.app/.

## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used.
* [npm](https://docs.npmjs.com//) - Dependency Management
* [TailwindCSS](https://tailwindcss.com/) - Used for CSS and Responsiveness
* [Axios](https://www.npmjs.com/package/axios) - Used for API calls to the backend.
* [Fortawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) - Used for icons.
* [ReactToastify](https://www.npmjs.com/package/react-toastify?activeTab=readme) - Used for toast messages for success and errors

## Sources Used


### App.js

```
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginScreen from './components/Login';
import UserDetailScreen from "./components/UserDetailScreen";
import UserListingScreen from "./components/UserListingScreen";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginScreen/>}/>
                <Route path="/user-list" element={<UserListingScreen/>}/>
                <Route path="/user-detail/:id" element={<UserDetailScreen/>}/>
            </Routes>
        </Router>
    );
}

export default App;

```
In this file as we can see i used the React framework to create application and with tailwindcss i created the Login, User listing and User detail screen.


### Login.js

```
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

```
Login component steps:
1. In this Login component, the form is created using React components and styled with Tailwind CSS.
2. Toastify is used to make the Success and Error toast dialogs.
3. Used axios for making the API call to the backend url provided in the Tutorial requirements.
4. Once user is logged in successfully, the user is redirected to the User listing screen.

### UserListingScreen.js

```
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


```
This component make one API call to fetch the list of users and implemented the search filter based on the first name or last name.
1. One the screen loading making api call to fetch all the list of users.
2. On entering the name in the search field local search has been working with the maps and filtering method.
3. By tapping on any user card, user is redirected to user detail screen using the navigator.

### UserCard.js

```
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

```
This component only has simple card which is showing the user information for the user listing screen.




### UserDetailScreen.js

```
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

```
This component made one API to fetch that particular user detail from the API provided by the professor. Using 4 different cards i show all the user details.

### CSS files

```    
/*** tailwind.config.js **/

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

```
The CSS provided above is utilized to define the theme and styling elements for the application, including fonts.

### References

[1]  "My Password Concept Illustration," Freepik. [Online]. Available at: https://www.freepik.com/free-vector/my-password-concept-illustration_11436091.htm#fromView=search&page=1&position=51&uuid=a7cd0c67-cdbc-422a-9b39-29282885b1ae [Accessed: 04 June 2024]

[2]  "Brown Green Mountains Ocean Day Time Black," PickPik. [Online]. Available at: https://www.pickpik.com/brown-green-mountains-ocean-day-time-black-78234 [Accessed: 19 June 2024].

[3]  "Iceland Mountains Sky Clouds," PickPik. [Online]. Available at: https://i1.pickpik.com/photos/505/534/455/iceland-mountains-sky-clouds-9b99ed0ad454e793dcf20d69e8cec8bd.jpg [Accessed: 19 June 2024].

[4]  "New Zealand Mountains Sky Clouds," PickPik. [Online]. Available at: https://i2.pickpik.com/photos/928/417/143/new-zealand-mountains-sky-clouds-2fe9dc8951cc91a867aaa7a5d9e9e5b8.jpg [Accessed: 19 June 2024].

## Acknowledgments

* The code offered valuable insights, laying the groundwork for understanding the functionality and logic of several UI components. I am grateful for their work and dedication.
* It provided valuable insights and influenced my approach in understanding and learning the approaches and specific techniques. Their contribution is highly appreciated.