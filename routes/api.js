const express = require('express');
const router = express.Router();

const controller = require('../controllers/dataController');

// --- CRUD Routes ---

// POST /api/users
router.post('/users', controller.createNewUser);

// GET /api/users - Get all users
router.get('/users', controller.getAllUsers);

// GET /api/users/:uuid - Get a single user by their UUID
router.get('/users/:uuid', controller.getUserByUuid);

// Update (PUT)
router.put('/users/:uuid', controller.updateUser);

// Delete (DELETE)
router.delete('/users/:uuid', controller.deleteUser);


// --- 8 Questions Routes ---
// We will add these later

// Export the router so our app.js can use it
module.exports = router;