// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200' // Replace with your Angular app's origin
}));

// Connect to MongoDB database
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined.');
}
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit on error
});
db.once('open', () => console.log('Connected to MongoDB'));

// Define routes
const formConfigRoutes = require('./routes/formConfigRoutes');
app.use('/api', formConfigRoutes);

// Middleware for 404 errors (optional)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


// Define route handler for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
