const express = require('express');
const router = express.Router();
const consultationForm = require('../models/consultationForm');
const {sendConsultationMessage} = require('../nodemailer');

router.post('/', async(req, res) => {
  const {name, phone} = req.body;
  try{
    const newConsultationForm = new consultationForm({
      name, phone
    })
    sendConsultationMessage(newConsultationForm);
    await newConsultationForm.save();

    res.status(200).json(newConsultationForm);
  } catch(e) {
    res.status(500).json(e);
  }
  

})

module.exports = router