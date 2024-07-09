# Tutorial 5

* *Date Created*: 09 July 2024
* *Last Modification Date*: 09 July 2024
* *Website URL*: <https://csci-5709-tutorials-njcj.onrender.com>
* *Git URL*: <https://git.cs.dal.ca/nkukadiya/CSCI-5709-Tutorials/-/tree/main/Tutorial5?ref_type=heads>

## Authors

* Nikulkumar Kukadiya (nk865270@dal.ca)

## Deployment

The project code available in the Tutorial5 directory was pushed to Github and then using the Netlify deployment deployed to the server.

Steps of Deployment:
1. Upload your code to the main branch of the GitHub repository.
2. Retrieve the Tutorial5 project from GitHub and import it into Render.
3. Configure the build settings using yarn and node app.js.
4. Access the live application at https://csci-5709-tutorials-njcj.onrender.com.

## Built With

* [npm](https://docs.npmjs.com//) - Dependency Management
* [body-parser](https://www.npmjs.com/package/body-parser/v/1.20.2) - Parse the Body of the request
* [express](https://www.npmjs.com/package/express/v/4.19.2) - Express to deploy routes of node app 
* [uuid](https://www.npmjs.com/package/uuid/v/10.0.0) - UUID package to create random ids.

## Sources Used


### app.js

```
const express = require('express');
const bodyParser = require('body-parser');
const users_data = require('./users_data');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());



// Get api to retrieve all users
app.get('/users', (req, res) => {
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
app.get('/user/:id', (req, res) => {
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
app.post('/add', (req, res) => {
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
app.delete('/delete/:id', (req, res) => {
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
app.put('/update/:id', (req, res) => {
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


app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});

```
In  this file as shown code is simple to under stand jsut used maps and key value pairs to store and update the data of the users_data variable and returned it as per the API request received on any route.

### Curls request for above api for easy testing.

1. Get users: curl --location 'https://csci-5709-tutorials-njcj.onrender.com/users'
2. Get user: curl --location 'https://csci-5709-tutorials-njcj.onrender.com/user/5abf674563'
3. Add user: curl --location 'https://csci-5709-tutorials-njcj.onrender.com/add' \
   --header 'Content-Type: application/json' \
   --data-raw '{"email": "xyz452@xyz.ca", "firstName": "XYZ"}'
4. Update user: curl --location --request PUT 'https://csci-5709-tutorials-njcj.onrender.com/update/5abf6783' \
   --header 'Content-Type: application/json' \
   --data-raw '{"email": "newemail@domain.com", "firstName": "NewName"}'
5. Delete user: curl --location --request DELETE 'https://csci-5709-tutorials-njcj.onrender.com/delete/a559d471-f166-4a46-a3e2-1be18124c1a6' \
   --header 'Content-Type: application/json' \
   --data ''

### Important Notes

Please take a note that as the netlify is used for deploying the static websites it gave some errors during the deployment of the app so used [Render](https://render.com/) to deploy this project.

## Acknowledgments

* The code offered valuable insights, laying the groundwork for understanding the functionality and logic of several UI components. I am grateful for their work and dedication.
* It provided valuable insights and influenced my approach in understanding and learning the approaches and specific techniques. Their contribution is highly appreciated.