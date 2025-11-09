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


// Questions Routes
router.get('/questions/gender-count', controller.getGenderCount);
router.get('/questions/average-age', controller.getAverageAge);
router.get('/questions/common-country', controller.getMostCommonCountry);
router.get('/questions/average-age-common-country', controller.getAverageAgeInCommonCountry);
router.get('/questions/common-firstname', controller.getMostCommonFirstName);
router.get('/questions/over-30-count', controller.getUsersOver30);
router.get('/questions/france-count', controller.getUsersFromFrance);
router.get('/questions/us-users-list', controller.getUsersFromUS);

// Export the router so our app.js can use it
module.exports = router;