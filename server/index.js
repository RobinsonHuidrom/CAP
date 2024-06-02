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
mongoose.connect(process.env.MONGODB_URI); // Fix the typo here
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define routes
const formConfigRoutes = require('./routes/formConfigRoutes');
app.use('/api', formConfigRoutes);

// Define route handler for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
