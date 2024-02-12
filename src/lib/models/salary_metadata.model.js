import mongoose from "mongoose";
const Schema = mongoose.Schema;
const salary_metadata = new Schema({
  sal_da: {
    type: Number,
    required: true
  },
  sal_hra: {
    type: Number,
    required: true
  },
  sal_bonus: {
    type: Number,
    required: true
  },
  sal_pf: {
    type: Number,
    required: true
  },
  sal_profession_tax: {
    type: Number,
    required: true
  }
});
