import mongoose from "mongoose";
const Schema = mongoose.Schema;
const raw_material = new Schema({
  name: {
    type: String,
    required: true
  },
  description: [{
    type: String,
    required: true
  }],
  color: {
    type: String
  },
  size: {
    type: String
  },
  chemical_property: [{
    type: String,
    required: true,
  }],
  image: {
    type: String,
    required: true
  },
  unit_of_measurement: {
    type: String,
    required: true
  },
  usage_process_level: {
    type: Number,
    required: true
  },
  supplier_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  raw_material_order_id: [{
    type: Schema.Types.ObjectId,
    required: true
  }],
  raw_material_stock_id: [{
    type: Schema.Types.ObjectId,
    required: true
  }]
});
