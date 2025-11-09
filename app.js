const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
  });

// Import API Routes
const apiRoutes = require('./routes/api.js');
app.use('/api', apiRoutes);

// --- Basic Route ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;