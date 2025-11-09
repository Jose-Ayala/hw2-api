const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const User = require('./models/dataModel'); 

const jsonData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful for seeding.');
    seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// --- Seeding Function ---
const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log('Clearing existing data from "users" collection...');
    await User.deleteMany({});
    console.log('Data cleared.');

    // Insert new data
    console.log('Inserting new data...');
    await User.insertMany(jsonData);
    console.log('Data successfully seeded!');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};