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
            <div
                className="w-full h-full px-6 py-4 shadow-md flex flex-col-reverse lg:flex-row items-center  overflow-y-auto">
                <div className="w-full lg:w-1/2 mb-4 lg:mr-4 flex justify-center items-center">
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
            className={`absolute bg-white border border-gray-300 p-2 rounded-lg shadow-md ${show ? 'block' : 'hidden'}`}>
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

//https://www.freepik.com/free-vector/abstract-realistic-technology-particle-background_6764484.htm#query=login%20background&position=25&from_view=keyword&track=ais_user&uuid=453bb8de-6af9-4156-bc53-a5064967b965
// https://pixabay.com/videos/sea-beach-sunset-tree-53127/
// https://www.freepik.com/free-vector/my-password-concept-illustration_11436091.htm#fromView=search&page=1&position=51&uuid=a7cd0c67-cdbc-422a-9b39-29282885b1ae