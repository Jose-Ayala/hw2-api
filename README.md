# HW2: RESTful API with Node.js and MongoDB

This project is a backend system for HW2 of COP5818. It uses Node.js, Express, and MongoDB to create a RESTful API for managing a user dataset.

## Project Description

The API provides full CRUD (Create, Read, Update, Delete) operations for the user data and also includes eight custom endpoints to answer specific questions about the dataset.

## GitHub Repository

**Link:** https://github.com/Jose-Ayala/hw2-api

---

## Setup and Installation

1.  **Clone the repository (or download the ZIP):**
    ```bash
    git clone https://github.com/Jose-Ayala/hw2-api
    cd Homework 2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the project root and add your MongoDB connection string:
    ```
    MONGO_URI=mongodb://localhost:27017/hw2db
    ```
    *(Or use your MongoDB Atlas string if you are using the cloud version.)*

4.  **Seed the database:**
    Run the `seed.js` script to populate your database with the initial 100 users.
    ```bash
    node seed.js
    ```

5.  **Run the server:**
    This will start the server using `nodemon`, which automatically restarts on file changes.
    ```bash
    npm run dev
    ```
    The API will be running at `http://localhost:3000`.

---

## API Endpoints

*(We will fill this section in later, after we build the endpoints.)*