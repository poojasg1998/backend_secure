const express = require('express');
const router = express.Router();
const Company = require('../models/Company');


// ✅ CREATE Company
router.post('/add', async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
    console.log(res.send(express.json))
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ READ all employees
router.get('/', async (req, res) => {
  const company = await Company.find();
  res.json(company);
});

// ✅ UPDATE employee
router.put('/:id', async (req, res) => {
  const updated = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});
// ✅ DELETE employee
router.delete('/:id', async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});
module.exports = router;
