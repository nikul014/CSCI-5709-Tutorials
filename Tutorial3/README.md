# Tutorial 3

* *Date Created*: 05 June 2024
* *Last Modification Date*: 06 June 2024
* *Website URL*: <https://666214067d1f5f5796c788b4--tutorial3-advance-web-development.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/nkukadiya/CSCI-5709-Tutorials/-/tree/main/Tutorial3?ref_type=heads>

## Authors

* Nikulkumar Kukadiya (nk865270@dal.ca)

## Deployment

The project code available in the Tutorial3 directory was pushed to Github and then using the Netlify deployment deployed to the server.

Steps of Deployment:
1. Upload your code to the main branch of the GitHub repository.
2. Retrieve the Tutorial3 project from GitHub and import it into Netlify.
3. Configure the build settings using npm run build and adjust the publish directory for deploying the application.
4. Access the live application at https://666214067d1f5f5796c788b4--tutorial3-advance-web-development.netlify.app/.

## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used.
* [npm](https://docs.npmjs.com//) - Dependency Management
* [TailwindCSS](https://tailwindcss.com/) - Used for CSS and Responsiveness
* [Fortawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) - Used for icons.

## Sources Used


### App.js

```
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
        </Router>
    );
}

export default App;

```
In this file as we can see i used the React framework to create application and with tailwindcss i created the signup and profile screen.


### Signup.js

```
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faEye, faEyeSlash, faXmarkCircle} from '@fortawesome/free-solid-svg-icons'

const Signup = () => {

    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password') {
            const length = value.length >= 8;
            const uppercase = /[A-Z]/.test(value);
            const lowercase = /[a-z]/.test(value);
            const number = /[0-9]/.test(value);
            const specialChar = /[^A-Za-z0-9]/.test(value);

            setPasswordChecks({
                length,
                uppercase,
                lowercase,
                number,
                specialChar
            });
        }
    };

    const isValidFormData = () => {
        let formErrors = {};
        let validCredentials = true;

        if (!formData.firstName.match(/^[A-Za-z]+$/)) {
            formErrors.firstName = 'First Name should only contain letters.';
            validCredentials = false;
        }

        if (!formData.lastName.match(/^[A-Za-z]+$/)) {
            formErrors.lastName = 'Last Name should only contain letters.';
            validCredentials = false;
        }

        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            formErrors.email = 'Please enter a valid email address (e.g., jon_snow@westeros.com).';
            validCredentials = false;
        }

        if (!passwordChecks.length || !passwordChecks.uppercase || !passwordChecks.lowercase || !passwordChecks.number || !passwordChecks.specialChar) {
            formErrors.password = 'Password does not meet the requirements.';
            validCredentials = false;
        }

        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords entered do not match the confirm password.";
            validCredentials = false;
        }

        setErrors(formErrors);
        return validCredentials;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidFormData()) {
            navigate('/profile', {state: {formData}});
        }
    };


    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

    return (
        <div className="w-full h-screen flex justify-center items-center" style={{backgroundImage: `url(/bg.jpg)`}}>
            //Image bg.jpg available at:https://www.freepik.com/free-vector/abstract-realistic-technology-particle-background_6764484.htm#query=login%20background&position=25&from_view=keyword&track=ais_user&uuid=453bb8de-6af9-4156-bc53-a5064967b965 accessed on 4 June 2024.
            <div
                className="w-full h-full px-6 py-4 shadow-md flex flex-col-reverse lg:flex-row items-center  overflow-y-auto">
                <div className="w-full lg:w-1/2 mb-4 lg:mr-4 flex justify-center items-center">
                    // Image signup_side.png available at:https://www.freepik.com/free-vector/my-password-concept-illustration_11436091.htm#fromView=search&page=1&position=51&uuid=a7cd0c67-cdbc-422a-9b39-29282885b1ae  accessed on 4 June 2024.
                    <img src="/signup_side.png" alt="signup" className="w-1/2 h-1/2"/>
                </div>

                <div className="w-full lg:w-1/2 items-center">
                    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-2xl">
                        <h2 className="text-2xl font-semibold text-center mb-4">Profile Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First
                                    Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last
                                    Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email"
                                       className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password"
                                       className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => setShowPasswordTooltip(true)}
                                        onBlur={() => setShowPasswordTooltip(false)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-4 flex items-center"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                                         className="text-gray-500"/>
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                <PasswordTooltip show={showPasswordTooltip} passwordChecks={passwordChecks}/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm
                                    Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                {errors.confirmPassword &&
                                    <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                            </div>
                            <div className="flex items-center justify-center mb-2">
                                <button
                                    type="submit"
                                    className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};


const PasswordTooltip = ({show, passwordChecks}) => {
    return (
        <div
            className={`absolute bg-white border border-gray-200 p-4 rounded-lg shadow-3xl ${show ? 'block' : 'hidden'} z-10`}>
            <p className="text-sm">Minimum 8 characters: {getValidationIcon(passwordChecks.length)}</p>
            <p className="text-sm">At least 1 uppercase letter: {getValidationIcon(passwordChecks.uppercase)}</p>
            <p className="text-sm">At least 1 lowercase letter: {getValidationIcon(passwordChecks.lowercase)}</p>
            <p className="text-sm">At least 1 number: {getValidationIcon(passwordChecks.number)}</p>
            <p className="text-sm">At least 1 special character: {getValidationIcon(passwordChecks.specialChar)}</p>
        </div>
    );
};


const getValidationIcon = (isValid) => {
    return isValid ? (
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 ml-2"/>
    ) : (
        <FontAwesomeIcon icon={faXmarkCircle} className="text-red-600 ml-2"/>
    );
};


export default Signup;

```
Signup component steps:
1. In this Signup component, the form is created using React components and styled with Tailwind CSS.
2. JavaScript is used for form validations. A tooltip dialog is shown on password input focus, validating the password based on the following criteria: at least one uppercase letter, one lowercase letter, one number, one special character, and a minimum of 8 characters.
3. Once all validations are passed, the user is redirected to the profile screen.

### Profile.js

```
import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    return (
        <div className="min-h-screen flex justify-center items-center">
            <video autoPlay loop muted className="fixed inset-0 w-full h-full object-cover">
                // Video video.mp4 available at:https://pixabay.com/videos/sea-beach-sunset-tree-53127/  accessed on 4 June 2024.     
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

```
This component displays a simple video background and presents the first name, last name, and email address retrieved from React Router DOM.

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
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

```
The CSS provided above is utilized to define the theme and styling elements for the application, including fonts.

### References

[1]  "Abstract Realistic Technology Particle Background," Freepik. [Online]. Available at: https://www.freepik.com/free-vector/abstract-realistic-technology-particle-background_6764484.htm#query=login%20background&position=25&from_view=keyword&track=ais_user&uuid=453bb8de-6af9-4156-bc53-a5064967b965 [Accessed: 04 June 2024]

[2]	 "My Password Concept Illustration," Freepik. [Online]. Available at: https://www.freepik.com/free-vector/my-password-concept-illustration_11436091.htm#fromView=search&page=1&position=51&uuid=a7cd0c67-cdbc-422a-9b39-29282885b1ae [Accessed: 04 June 2024]

[3]  "Sea Beach Sunset Tree," Pixabay. [Online]. Available at: https://pixabay.com/videos/sea-beach-sunset-tree-53127/ [Accessed: 04 June 2024]

## Acknowledgments

* The code offered valuable insights, laying the groundwork for understanding the functionality and logic of several UI components. I am grateful for their work and dedication.
* It provided valuable insights and influenced my approach in understanding and learning the approaches and specific techniques. Their contribution is highly appreciated.