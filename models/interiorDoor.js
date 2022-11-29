const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interiorDoor = new Schema({
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
    require: true,
  },
  finishingTheSurface: {
    type: [{type: String, default: undefined}],
    require: true
  },
  frameMaterial: {
    type: [{type: String, default: undefined}],
    require: true,
  },
  structuralFeatures: {
    type: [{type: String, default: undefined}],
    require: true
  },
  openingType: {
    type: [{type: String, default: undefined}],
    require: true
  },
  installationType: {
    type: [{type: String, default: undefined}],
    require: true,
  },
  openingMethod: {
    type: [{type: String, default: undefined}],
    require: true
  },
  imageSrc: {
    type: String,
    require: true
  },
  homePage: {
    type: Boolean,
    require: true
  }
})

module.exports = mongoose.model('interiorDoor', interiorDoor);