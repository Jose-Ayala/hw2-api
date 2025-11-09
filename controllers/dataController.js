const User = require('../models/dataModel');

// CREATE
const createNewUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by their UUID
const getUserByUuid = async (req, res) => {
  try {
    const user = await User.findOne({ 'login.uuid': req.params.uuid });
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { 'login.uuid': req.params.uuid },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (updatedUser == null) {
      return res.status(404).json({ message: 'Cannot find user to update' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ 'login.uuid': req.params.uuid });
    
    if (deletedUser == null) {
      return res.status(404).json({ message: 'Cannot find user to delete' });
    }
    res.json({ message: 'Deleted user successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//QUESTIONS

// Gender Count
const getGenderCount = async (req, res) => {
  try {
    const genderCount = await User.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);
    res.json({
      question: "Gender Count: How many users are male and how many are female?",
      answer: genderCount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Average Age
const getAverageAge = async (req, res) => {
  try {
    const avgAge = await User.aggregate([
      { $group: { _id: null, averageAge: { $avg: '$dob.age' } } }
    ]);
    res.json({
      question: "Average Age: What is the average age of all users?",
      answer: avgAge[0]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Most Common Country
const getMostCommonCountry = async (req, res) => {
  try {
    const commonCountry = await User.aggregate([
      { $group: { _id: '$location.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } }, 
      { $limit: 1 }
    ]);
    res.json({
      question: "Most Common Country: Which country is the most common?",
      answer: commonCountry[0]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Average Age in Common Country
const getAverageAgeInCommonCountry = async (req, res) => {
  try {
    const commonCountry = await User.aggregate([
      { $group: { _id: '$location.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    
    const countryName = commonCountry[0]._id;

    const avgAge = await User.aggregate([
      { $match: { 'location.country': countryName } },
      { $group: { _id: countryName, averageAge: { $avg: '$dob.age' } } }
    ]);

    res.json({
      question: "Average Age in Common Country: What is the average age of users from the most common country?",
      answer: avgAge[0]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Most Common First Name
const getMostCommonFirstName = async (req, res) => {
  try {
    const commonFirstName = await User.aggregate([
      { $group: { _id: '$name.first', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    res.json({
      question: "Most Common First Name: What is the most common first name?",
      answer: commonFirstName[0]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Count Users Over 30
const getUsersOver30 = async (req, res) => {
  try {
    const count = await User.countDocuments({ 'dob.age': { $gt: 30 } });
    res.json({
      question: "Over Age 30: How many users are over the age of 30?",
      answer: { count: count }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Count Users from France
const getUsersFromFrance = async (req, res) => {
  try {
    const count = await User.countDocuments({ 'location.country': 'France' });
    res.json({
      question: "Users from a Specific Country: How many users are from France?",
      answer: { country: "France", count: count }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List Users from US
const getUsersFromUS = async (req, res) => {
  try {
    const users = await User.find(
      { 'location.country': 'United States' },
      { 'name.first': 1, 'name.last': 1, _id: 0 }
    );

    const fullNames = users.map(user => `${user.name.first} ${user.name.last}`);

    res.json({
      question: "List of users from US: What are the full names of users from the US?",
      answer: {
        country: "United States",
        userCount: fullNames.length,
        users: fullNames
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Export all the functions
module.exports = {
  createNewUser,
  getAllUsers,
  getUserByUuid,
  updateUser,
  deleteUser,
  getGenderCount,
  getAverageAge,
  getMostCommonCountry,
  getAverageAgeInCommonCountry,
  getMostCommonFirstName,
  getUsersOver30,
  getUsersFromFrance,
  getUsersFromUS
};