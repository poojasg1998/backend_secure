const mongoose = require('mongoose');


const fcmtokensSchema = new mongoose.Schema(
  {
    name: String,
    token: String
  },
  { collection: 'FCM_Tokens' }
);

module.exports = mongoose.model('Fcmtoken', fcmtokensSchema);