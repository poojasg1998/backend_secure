const mongoose = require('mongoose');

const fcmtokensSchema = new mongoose.Schema({
  name: String,
  token: String
});

module.exports = mongoose.model('Fcmtoken', fcmtokensSchema);