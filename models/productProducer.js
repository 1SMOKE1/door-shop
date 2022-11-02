const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productProducer = new Schema({
  producerName: {
    type: String,
    require: true
  },
  filtrationField: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('productProducer', productProducer);