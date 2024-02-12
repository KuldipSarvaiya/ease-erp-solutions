import mongoose from "mongoose";
const Schema = mongoose.Schema;
const incomeSchema = new Schema(
  {
    customer_order_id: {
      type: Schema.ObjectId,
      ref: "CustomerOrder",
      required: false,
    },
    type: {
      type: String,
      required: true,
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
  {
    timestamps: true,
  }
);

const Income = mongoose.model.Income || mongoose.model("Income", incomeSchema);

export default Income;
