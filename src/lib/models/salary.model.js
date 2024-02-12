import mongoose from "mongoose";
const Schema = mongoose.Schema;
const salary = new Schema({
  employee_id: {
    type: employee,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  dearness_allowance: {
    type: Number,
    required: true
  },
  house_rent_allowance: {
    type: Number,
    required: true
  },
  bonus: {
    type: Number,
    required: true
  },
  provident_fund: {
    type: Number,
    required: true
  },
  profession_tax: {
    type: Number,
    required: true
  },
  basic_salary: {
    type: Number,
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
  }
});
