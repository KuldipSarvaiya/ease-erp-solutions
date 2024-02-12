import  mongoose from "mongoose";
const Schema = mongoose.Schema;
const task = new Schema({
  date: {
    type: Date,
    required: true
  },
  assigned_employee_id: {
    type: employee,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  is_complete: {
    type: String,
    required: true
  }
});
