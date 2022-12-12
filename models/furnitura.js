const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const furnitura = new Schema({
  typeOfProduct: {
    type: String,
    require: true
  },
  brand: {
    type: String, 
    require: true
  },
  country: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  guarantee: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  installationPrice: {
    type: Number,
    require: true
  },
  inStock: {
    type: String,
    require: true
  },
  description: {
    type: String,
  },
  imageSrc: {
    type: String,
    require: true
  },
  homePage: {
    type: Boolean,
  }
})

module.exports = model('furnitura', furnitura)