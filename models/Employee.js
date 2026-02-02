const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {}, 
  { collection: 'users' } // 👈 force collection
);
module.exports = mongoose.model('Employee', employeeSchema);
