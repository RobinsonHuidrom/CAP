// routes/formConfigRoutes.js

const express = require('express');
const router = express.Router();
const FormConfig = require('../models/FormConfig');

// GET all form configurations with populated controls
router.get('/formConfigs', async (req, res) => {
  try {
    const formConfigs = await FormConfig.find().populate('steps.controls'); // Populate controls
    res.json(formConfigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET a specific form configuration by ID (unchanged)
router.get('/formConfigs/:id', getFormConfig, (req, res) => {
  res.json(res.formConfig);
});

// Middleware to get a specific form configuration by ID (unchanged)
async function getFormConfig(req, res, next) {
  let formConfig;
  try {
    formConfig = await FormConfig.findById(req.params.id);
    if (formConfig == null) {
      return res.status(404).json({ message: 'Form configuration not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.formConfig = formConfig;
  next();
}

// POST a new form configuration (unchanged)
router.post('/formConfigs', async (req, res) => {
  const formConfig = new FormConfig({
    id: req.body.id,
    name: req.body.name,
    steps: req.body.steps
  });

  try {
    const newFormConfig = await formConfig.save();
    res.status(201).json(newFormConfig);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a specific form configuration by ID (unchanged)
router.put('/formConfigs/:id', getFormConfig, async (req, res) => {
  res.formConfig.id = req.body.id;
  res.formConfig.name = req.body.name;
  res.formConfig.steps = req.body.steps;

  try {
    const updatedFormConfig = await res.formConfig.save();
    res.json(updatedFormConfig);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific form configuration by ID (unchanged)
router.delete('/formConfigs/:id', getFormConfig, async (req, res) => {
  try {
    await res.formConfig.remove();
    res.json({ message: 'Form configuration deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;