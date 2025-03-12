# Node.js CRUD API with MongoDB

This project demonstrates how to build a CRUD (Create, Read, Update, Delete) API using **Node.js**, **Express.js**, and **MongoDB**. Everything about the project—its purpose, file structure, and complete source code for every file—is documented in this single README file. No external files are needed to understand or reproduce this project.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Complete Code](#complete-code)
   - [app.js](#appjs)
   - [connection.js](#connectionjs)
   - [models/DataBase.js](#modelsdatabasejs)
   - [controllers/userController.js](#controllersusercontrollerjs)
   - [routes/user.js](#routesuserjs)
   - [middlewares/index.js](#middlewaresindexjs)
4. [Setup Instructions](#setup-instructions)
5. [API Endpoints](#api-endpoints)
6. [Usage Examples](#usage-examples)
7. [Best Practices and Technologies](#best-practices-and-technologies)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

This project implements a simple RESTful API that performs CRUD operations on user data stored in a MongoDB database. It uses:
- **Express.js** for routing and middleware.
- **Mongoose** for MongoDB object modeling.
- A modular structure that separates code into controllers, models, routes, and middlewares.

Every request is logged to a file via custom middleware, and request data is validated before processing.

---

## File Structure

The project follows a clean, modular structure as shown below:

---

## Complete Code

Below are the complete code listings for every file in the project.

### app.js
This is the main entry point of the application. It sets up the Express app, connects to MongoDB, registers middlewares, and routes.

```javascript
const express = require('express');
const PORT = 8001;
const { connectMongoose } = require("./connection");
const { logReqRes } = require('./middlewares');

// Connect to MongoDB
connectMongoose("mongodb://127.0.0.1:27017/Tested_DB").then(() => {
  console.log("MongoDB Connected");
});

const userRouter = require('./routes/user');
const app = express();

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log requests to a file (log.txt)
app.use(logReqRes('./log.txt'));

// Register routes for user data
app.use('/api/UserData', userRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
```
### Connection.js
```javascript
const mongoose = require('mongoose');

const connectMongoose = async (url) => {
  return mongoose.connect(url);
};

module.exports = { connectMongoose };
```
### modals/DataBase.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  jobtitle: { type: String },
  gender: { type: String }
});

const UserData = mongoose.model('MyTable', userSchema);

module.exports = UserData;
```
### Controls/userControls
```javascript
const UserData = require("../models/DataBase");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, email } = req.body;
    if (!firstName || !email) {
      return res.status(400).json({ error: 'firstName and email are required' });
    }
    const newUser = new UserData(req.body);
    await newUser.save();
    res.status(201).json({ msg: "Successful", id: newUser._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: err.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await UserData.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getUserById };
```
### routes/user.js
```javascript
const express = require('express');
const { createUser, getUserById } = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get a user by ID
router.get('/:id', getUserById);

module.exports = router;
```
### middlewares/index.js
```javascript
const fs = require('fs');

const logReqRes = (file) => (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} - ${req.url}\n`;
  fs.appendFile(file, log, (err) => {
    if (err) console.log(err);
  });
  next();
};

module.exports = { logReqRes };
```

