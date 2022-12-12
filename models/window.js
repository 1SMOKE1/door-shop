const mongoose =  require('mongoose');
const { Schema, model } = mongoose;

const window = new Schema({
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
  profile: {
    type: [{type: String, default: undefined}],
    require: true
  },
  construction: {
    type: [{type: String, default: undefined}],
    require: true
  },
  glassUnit: {
    type: [{type: String, defaulg: undefined}],
    require: true
  },
  lamination: {
    type: [{type: String, defaulg: undefined}],
    require: true,
  },
  glasses: {
    type: [{type: String, defaulg: undefined}],
    require: true
  },
  imageSrc: {
    type: String, 
    require: true
  },
  homePage: {
    type: Boolean
  }
})

module.exports = model('window', window)