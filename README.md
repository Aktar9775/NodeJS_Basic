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

