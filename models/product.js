const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  imageSrc: {
    type: String,
    default: '',
  },
  installationPrice: {
    type: Number,
    require: true
  },
  brand: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  guarantee_time: {
    type: String,
    default: '12 місяців',
  },
  state: {
    type: String,
    require: true
  },
  in_stock: {
    type: String,
    require: true
  },
  type_of_product: {
    type: String,
    require: true
  },
  count_of_sealing_conturs: {
    type: Number,
  },
  door_leaf_material: {
    type: String
  },
  door_frame_material: {
    type: String
  },
  door_purpose: {
    type: String
  },
  door_fill: {
    type: String,
  },
  door_application: {
    type: String,
  },
  door_opening_method: {
    type: String
  },
  door_type: {
    type: String
  },
  door_opening_type: {
    type: String
  },
  door_area_material: {
    type: String
  },
  sail: {
    type: String
  },
  home_page: {
    type: Boolean
  }, 
  description: {
    type: String
  }
})

module.exports = mongoose.model('Product', productSchema)