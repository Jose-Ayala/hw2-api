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

The API is served at the base URL `http://localhost:3000/api`.

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| **CRUD Operations** | | |
| GET | `/users` | Retrieves a list of all users (Read All). |
| GET | `/users/:uuid` | Retrieves a single user by their UUID (Read One). |
| POST | `/users` | Creates and inserts a new user into the database (Create). |
| PUT | `/users/:uuid` | Updates an existing user based on UUID (Update). |
| DELETE | `/users/:uuid` | Deletes a user based on UUID (Delete). |
| **Custom Query Endpoints** | | |
| GET | `/questions/gender-count` | **Q1:** Returns the total count of male and female users. |
| GET | `/questions/average-age` | **Q2:** Calculates and returns the average age of all users. |
| GET | `/questions/common-country` | **Q3:** Identifies and returns the country with the most users. |
| GET | `/questions/average-age-common-country` | **Q4:** Calculates the average age of users in the most common country. |
| GET | `/questions/common-firstname` | **Q5:** Identifies and returns the most frequently occurring first name. |
| GET | `/questions/over-30-count` | **Q6:** Returns the number of users older than 30. |
| GET | `/questions/france-count` | **Q7:** Returns the total number of users from France. |
| GET | `/questions/us-users-list` | **Q8:** Returns a list of the full names of all users from the United States. |
