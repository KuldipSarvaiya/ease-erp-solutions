import mongoose from "mongoose";
const Schema = mongoose.Schema;
const product = new Schema({
  name: {
    type: String,
    required: true
  },
  description: [{
    type: String,
    required: true
  }],
  chemical_property: [{
    type: String,
    required: true
  }],
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  unit_of_measurement: {
    type: String,
    required: true
  },
  expiry_timing: {
    type: String,
    required: true
  },
  product_stock_id: [{
    type: Schema.Types.ObjectId,
    required: true
  }],
  order_id: [{
    type: Schema.Types.ObjectId,
    required: true
  }],
  available_stock_units: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
});
