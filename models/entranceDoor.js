const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entranceDoor = new Schema({
  typeOfProduct: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  guarantee: {
    type: String,
    require: true
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
    require: true,
  },
  amountOfSealingMaterials: {
    type: [{type: Number, default: 1}],
    require: true
  },
  fabricMaterial: {
    type: [{type: String, default: undefined}],
    require: true
  },
  purpose: {
    type: [{type: String, default: undefined}],
    require: true,
  },
  openingMethod: {
    type: [{type: String, default: undefined}],
    require: true,
  },
  covering: {
    type: [{type: String, default: undefined}],
    require: true,
  },
  frameMaterial: {
    type: [{type: String, default: undefined}],
    require: true
  },
  imageSrc: {
    type: String,
    require: true,
  },
  homePage: {
    type: Boolean, 
    require: true
  }
})

module.exports = mongoose.model('entranceDoor', entranceDoor);
