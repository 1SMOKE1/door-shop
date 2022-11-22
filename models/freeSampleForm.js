const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freeSampleForm = new Schema({
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('freeSampleForm', freeSampleForm);