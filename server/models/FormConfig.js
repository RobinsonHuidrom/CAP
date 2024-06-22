

// models/FormConfig.js

const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  label: String,
  value: mongoose.Schema.Types.Mixed // Allow for various value types (string, number, boolean)
});

const validationSchema = new mongoose.Schema({
  name: String,
  value: mongoose.Schema.Types.Mixed // Allow for various value types (string, number)
});

const conditionalLogicSchema = new mongoose.Schema({
  action: String,
  targets: [String],
  condition: String,
  value: mongoose.Schema.Types.Mixed // Allow for various value types for comparison
});

const controlSchema = new mongoose.Schema({
  type: String,
  controlName: String,
  label: String,
  options: [optionSchema],
  validation: [validationSchema],
  defaultValue: mongoose.Schema.Types.Mixed, // Allow for various value types
  conditionalLogic: conditionalLogicSchema
});

const stepSchema = new mongoose.Schema({
  label: String,
  controls: [controlSchema]
});

const formConfigSchema = new mongoose.Schema({
  name: String,
  steps: [stepSchema],
  formId: {
    type: Number,
    unique: true,
    index: true,
    auto: true
  }
});

module.exports = mongoose.model('FormConfig', formConfigSchema);
