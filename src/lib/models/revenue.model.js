import mongoose from "mongoose";
const Schema = mongoose.Schema;
const revenueSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "give a better name to revenue"],
    },
    type: {
      type: String,
      enum: {
        values: ["MONTHLY", "QUATERLY", "YEARLY"],
        message: "give proper type of revenue",
      },
      required: [true, "give type of revenue"],
      immutable: true,
    },
    income_id: {
      type: [Schema.ObjectId],
      ref: "Income",
      required: true,
    },
    expense_id: {
      type: [Schema.ObjectId],
      ref: "Expense",
      required: true,
    },
    revenue_from_date: {
      type: Date,
      required: true,
    },
    revenue_to_date: {
      type: Date,
      required: true,
    },
    total_income: {
      type: Number,
      required: true,
    },
    total_expense: {
      type: Number,
      required: true,
    },
    total_tax: {
      type: Number,
      required: true,
    },
    net_revenue: {
      type: Number,
      required: true,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Revenue =
  mongoose.models.Revenue || mongoose.model("Revenue", revenueSchema);

export default Revenue;
