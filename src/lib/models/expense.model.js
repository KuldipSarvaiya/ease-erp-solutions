import mongoose from "mongoose";
const Schema = mongoose.Schema;
const expenseSchema = new Schema(
  {
    type: {
      type: String,
      enum: {
        values: [
          "raw_material",
          "employee_expense",
          "emi",
          "maintenance",
          "marketing",
          "royalty",
          "accident",
          "other",
        ],
        message: "Given Expense Method is not supported / valid",
      },
      required: true,
      immutable: true,
    },
    raw_material_order_id: {
      type: Schema.ObjectId,
      ref: "RawMaterialOrder",
      required: false,
    },
    salary_id: {
      type: [Schema.ObjectId],
      ref: "Salary",
      required: false,
    },
    date: {
      type: Date,
      required: true,
      immutable: true,
    },
    amount: {
      type: Number,
      required: true,
      immutable: true,
    },
    description: {
      type: String,
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

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
