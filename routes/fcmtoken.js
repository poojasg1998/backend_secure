const express = require('express');
const router = express.Router();
const Fcmtoken = require('../models/fcm_tokens');


router.post('/add', async (req, res) => {
  try {
    const fcmtoken = await Fcmtoken.create(req.body);
    res.status(201).json(fcmtoken);
    console.log('BODY:', req.body);
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