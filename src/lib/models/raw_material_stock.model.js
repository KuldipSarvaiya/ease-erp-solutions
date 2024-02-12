import mongoose from "mongoose";
const Schema = mongoose.Schema;
const raw_material_stock = new Schema({
  raw_material_id: {
    type: raw_material,
    required: true
  },
  stock_produced_date: {
    type: Date,
    required: true
  },
  available_units: {
    type: Number,
    required: true
  },
  total_produced_unit: {
    type: Number,
    required: true
  },
  stock_over_date: {
    type: Date
  },
  stock_process_level: {
    type: Number,
    required: true
  }
});
