import mongoose from "mongoose";
const Schema = mongoose.Schema;
const revenue = new Schema({
  income_id: [{
    type: income,
    required: true
  }],
  expense_id: [{
    type: expense,
    required: true
  }],
  total_income: {
    type: Number,
    required: true
  },
  total_expense: {
    type: Number,
    required: true
  },
  total_tax: {
    type: Number,
    required: true
  },
  net_revenue: {
    type: Number,
    required: true
  },
  revenue_date: {
    type: Date,
    required: true
  }
});
