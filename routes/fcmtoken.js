const express = require('express');
const router = express.Router();
const Fcmtoken = require('../models/fcm_tokens');


// router.post('/add', async (req, res) => {
//   try {
//       const {  token, name } = req.body;
//     const fcmtoken = await Fcmtoken.create(req.body);
//     res.status(201).json(fcmtoken);
//     console.log('BODY:', req.body);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.post('/add', async (req, res) => {
  try {
    const { user_id, token, name } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'FCM token is required' });
    }

    const updateData = {
      token
    };

    // only add optional fields if present
    if (user_id) updateData.user_id = user_id;
    if (name) updateData.name = name;

    const fcmtoken = await Fcmtoken.findOneAndUpdate(
      { token },                 // 🔑 unique filter
      { $set: updateData },      // ✅ actual update
      { upsert: true, new: true }
    );

    res.status(201).json(fcmtoken);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const fcmtoken = await Fcmtoken.find();

    res.status(200).json({
      status: "True",
      message: "successfully Done",
      success: "success",
      Fcmtoken: fcmtoken, // your array goes here
    });

  } catch (error) {
    res.status(500).json({
      status: "False",
      message: error.message,
      success: "failed"
    });
  }
});

module.exports = router;