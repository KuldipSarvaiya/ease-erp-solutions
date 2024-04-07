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
      enum: {
        values: [
          "sells",
          "divident",
          "rental_income",
          "loan",
          "liecense",
          "joint_ventures",
          "other",
        ],
        message: "Given Income Method is not supported / valid",
      },
      immutable: true,
      required: true,
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
  {
    timestamps: true,
  }
);

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income;
