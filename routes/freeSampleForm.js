const express = require('express');
const router = express.Router();
const freeSampleForm = require('../models/freeSampleForm');
const {sendFreeSampleMessage} = require('../nodemailer');

router.post('/', async(req, res) => {
  const {name, phone, address} = req.body;
  try{
    const newFreeSampleForm = new freeSampleForm({
      name, phone, address
    })
    sendFreeSampleMessage(newFreeSampleForm);
    await newFreeSampleForm.save();

    res.status(200).json(newFreeSampleForm);
  } catch(e) {
    res.status(500).json(e);
  }
  

})

module.exports = router