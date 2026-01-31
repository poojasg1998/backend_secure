const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


// ✅ CREATE employee
router.post('/add', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
    console.log(res.send(express.json))
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ READ all employees
// router.get('/', async (req, res) => {
//   const employees = await Employee.find();
//   res.json(employees);
// });


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      status: "True",
      message: "successfully Done",
      success: "success",
      Employeees: employees, // your array goes here
    });

  } catch (error) {
    res.status(500).json({
      status: "False",
      message: error.message,
      success: "failed"
    });
  }
});


// ✅ UPDATE employee
router.put('/:id', async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});
// ✅ DELETE employee
router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});
module.exports = router;
