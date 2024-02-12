import mongoose from "mongoose";
const Schema = mongoose.Schema;
const supplier = new Schema({
  supplied_product_id: [{
    type: product,
    required: true
  }],
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact_no: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});
