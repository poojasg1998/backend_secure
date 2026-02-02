const express = require('express');
const router = express.Router();
const Fcmtoken = require('../models/fcm_tokens');


router.post('/add', async (req, res) => {
  try {
    const fcmtoken = await Fcmtoken.create(req.body);
    res.status(201).json(fcmtoken);
    console.log(res.send(express.json))
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});