const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
  },
  cartLines: {
    type: Array,
    require: true
  },
  shiped: {
    type: Boolean,
    require: true,
  },
  total_cost: {
    type: Number,
    require: true,
  },
  kindOfPayvment: {
    type: String,
    require: true
  }
})


module.exports = mongoose.model('Order', orderSchema)