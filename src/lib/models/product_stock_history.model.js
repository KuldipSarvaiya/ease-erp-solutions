import mongoose from "mongoose";
const Schema = mongoose.Schema;
const product_stock_historySchema = new Schema(
  {
    product_id: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
      immutable: true,
    },
    product_group_id: { type: String, required: true, immutable: true },
    units: {
      type: Number,
      required: true,
      immutable: true,
    },
    change_type: {
      type: String,
      enum: {
        values: ["Increase", "Decrease"],
      },
      required: true,
      immutable: true,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "stock_produced_date",
    },
  }
);

const ProductStockHistory =
  mongoose.models.ProductStockHistory ||
  mongoose.model("ProductStockHistory", product_stock_historySchema);

export default ProductStockHistory;
