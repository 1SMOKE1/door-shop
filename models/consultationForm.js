const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultationForm = new Schema({
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('consultationForm', consultationForm);