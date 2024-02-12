import mongoose from "mongoose";
const Schema = mongoose.Schema;
const product_stock = new Schema({
  product_id: {
    type: product,
    required: true
  },
  stock_produced_date: {
    type: Date,
    required: true
  },
  total_produced_uniit: {
    type: Number,
    required: true
  }
});
