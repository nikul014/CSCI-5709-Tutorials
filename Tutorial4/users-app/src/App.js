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
