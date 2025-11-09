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


// Export all the functions
module.exports = {
  createNewUser,
  getAllUsers,
  getUserByUuid,
  updateUser,
  deleteUser
  // We will add the 8 question functions here later
};