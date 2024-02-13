import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    chemical_property: {
      type: [String],
      required: true,
    },
    color: {
      type: String,
      required: true,
      immutable: true,
    },
    size: {
      type: String,
      required: true,
      immutable: true,
    },
    unit_of_measurement: {
      type: String,
      required: true,
      immutable: true,
    },
    expiry_timing: {
      type: String,
      required: true,
    },
    available_stock_units: {
      type: Number,
      required: false,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: {
      try: [String],
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

const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);

export default Product;
