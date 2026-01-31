const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  experience: Number,
  company:String
});

module.exports = mongoose.model('Employee', employeeSchema);
