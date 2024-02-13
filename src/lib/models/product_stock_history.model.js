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
    stock_produced_date: {
      type: Date,
      required: true,
      immutable: true,
    },
    total_produced_units: {
      type: Number,
      required: true,
      immutable: true,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductStockHistory =
  mongoose.model.ProductStockHistory ||
  mongoose.model("ProductStockHistory", product_stock_historySchema);

export default ProductStockHistory;
