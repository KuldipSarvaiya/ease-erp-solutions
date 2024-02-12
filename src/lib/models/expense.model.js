import mongoose from "mongoose";
const Schema = mongoose.Schema;
const expenseSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    raw_material_order_id: {
      type: [Schema.ObjectId],
      ref: "RawMaterialOrder",
      required: true,
    },
    salary_id: {
      type: [Schema.ObjectId],
      ref: "Salary",
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: tr }
);

const Expense =
  mongoose.model.Expense || mongoose.model("Expense", expenseSchema);

  export default Expense;