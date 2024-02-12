import mongoose from "mongoose";
const Schema = mongoose.Schema;
const raw_material_order = new Schema({
  supplier_id: [{
    type: Schema.Types.ObjectId,
    required: true
  }],
  raw_material_id: {
    type: raw_material,
    required: true
  },
  bill_no: {
    type: String,
    required: true
  },
  ordered_units: {
    type: String,
    required: true
  },
  order_received_date: {
    type: Date,
    required: true
  },
  payment_mode: {
    type: String,
    required: true
  },
  check_no: {
    type: String
  },
  transaction_no: {
    type: String
  },
  total_mrp: {
    type: Number,
    required: true
  },
  total_tax: {
    type: Number,
    required: true
  },
  delivery_charges: {
    type: Number,
    required: true
  },
  total_discount: {
    type: Number,
    required: true
  },
  net_bill_payable: {
    type: Number,
    required: true
  },
  bill_image: {
    type: String,
    required: true
  }
});
