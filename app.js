const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
  });

// --- Basic Route ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});