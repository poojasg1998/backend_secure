// const mongoose = require('mongoose');


// const fcmtokensSchema = new mongoose.Schema(
//   {
//     name: String,
//     token: String
//   },
//   { collection: 'FCM_Tokens' }
// );

// module.exports = mongoose.model('Fcmtoken', fcmtokensSchema);

const mongoose = require('mongoose');

const fcmtokensSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// 🔥 Compound unique index
fcmtokensSchema.index({ user_id: 1, token: 1 }, { unique: true });

module.exports = mongoose.model('Fcmtoken', fcmtokensSchema);
