const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ourWork = new Schema({
  imageSrc: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  }
})

module.exports = mongoose.model('ourWork', ourWork);