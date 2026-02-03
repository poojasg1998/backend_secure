const express = require('express');
const router = express.Router();
const Fcmtoken = require('../models/fcm_tokens');


router.post('/add', async (req, res) => {
  try {
    const { user_id, token, name } = req.body;

    const fcmtoken = await Fcmtoken.findOneAndUpdate(
      // { user_id, token },        // match condition
      { name },                  // fields to update
      { upsert: true, new: true } // insert if not exists
    );

    res.status(201).json(fcmtoken);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key error
      return res.status(200).json({ message: 'Token already exists' });
    }

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