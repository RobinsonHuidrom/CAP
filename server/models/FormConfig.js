

// models/FormConfig.js

const mongoose = require('mongoose');

const controlSchema = new mongoose.Schema({
  type: String,
  label: String,
  options: [{ type: String, default: [] }]
});

const stepSchema = new mongoose.Schema({
  label: String,
  controls: [controlSchema]
});

const formConfigSchema = new mongoose.Schema({
  name: String,
  steps: [stepSchema],
  // Add the new field with an auto-incrementing unique constraint
  formId: {
    type: Number,
    unique: true, // Ensures each form has a unique numeric ID
    index: true, // Creates an index for efficient querying
    auto: true // Automatically generates a unique value for each new document
  }
});


module.exports = mongoose.model('FormConfig', formConfigSchema);





