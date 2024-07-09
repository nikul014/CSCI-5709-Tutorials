import {Router} from "express";

const express = require('express');
const bodyParser = require('body-parser');
const users_data = require('./users_data');
import serverless from "serverless-http";
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());


const router = Router();


// Get api to retrieve all users
router.get('/users', (req, res) => {
    try {
        res.status(200).json({
            message: "Users retrieved",
            success: true,
            users_data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Get api to retrieve user by id as a path parameter
router.get('/user/:id', (req, res) => {
    try {
        const user = users_data.find(u => u.id === req.params.id);
        if (user) {
            res.status(200).json({
                success: true,
                user
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Post request to add a new user with email and firstname
router.post('/add', (req, res) => {
    try {
        const { email, firstName } = req.body;
        if (!email || !firstName) {
            return res.status(400).json({
                success: false,
                message: "Email and firstName are required"
            });
        }
        const id = uuidv4();
        const newUser = { email, firstName, id };
        users_data.push(newUser);
        res.status(201).json({
            message: "User added",
            success: true,
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Delete request for delete user by id
router.delete('/delete/:id', (req, res) => {
    try {
        const { id } = req.params;
        const userIndex = users_data.findIndex(u => u.id === id);

        if (userIndex !== -1) {
            users_data.splice(userIndex, 1);
            res.status(200).json({
                message: "User deleted",
                success: true
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


// Put request to update user detail based on the id from path and from email and firstname from body
router.put('/update/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { email, firstName } = req.body;
        const user = users_data.find(u => u.id === id);

        if (user) {
            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            res.status(200).json({
                message: "User updated",
                success: true
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);


// app.listen(3000, () => {
//     console.log(`Server running at http://localhost:3000`);
// });
