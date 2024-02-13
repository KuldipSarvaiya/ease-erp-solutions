import mongoose from "mongoose";
const Schema = mongoose.Schema;
const salarySchema = new Schema(
  {
    employee_id: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
      immutable: true,
    },
    salary_month: {
      type: Date,
      required: true,
      default: new Date(),
      immutable: true,
    },
    dearness_allowance: {
      type: Number,
      required: true,
      default: 0,
    },
    house_rent_allowance: {
      type: Number,
      required: true,
      default: 0,
    },
    bonus: {
      type: Number,
      required: true,
      default: 0,
    },
    provident_fund: {
      type: Number,
      required: true,
      default: 0,
    },
    profession_tax: {
      type: Number,
      required: true,
      default: 0,
    },
    basic_salary: {
      type: Number,
      required: true,
      immutable: true,
    },
    net_salary: {
      type: Number,
      required: true,
      immutable: true,
    },
    payment_mode: {
      type: String,
      required: true,
      immutable: true,
    },
    check_no: {
      type: String,
      required: false,
    },
    transaction_no: {
      type: String,
      required: false,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model.Salary || mongoose.model("Salary", salarySchema);

export default Salary;
