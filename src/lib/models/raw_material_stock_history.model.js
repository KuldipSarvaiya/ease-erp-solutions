import mongoose from "mongoose";
const Schema = mongoose.Schema;
const raw_material_stock_historySchema = new Schema(
  {
    raw_material_id: {
      type: Schema.ObjectId,
      ref: "RawMaterial",
      required: true,
      immutable: true,
    },
    // raw_material_stock_id: {
    //   type: Schema.ObjectId,
    //   ref: "RawMaterialStock",
    //   required: true,
    // },
    stock_produced_date: {
      type: Date,
      required: true,
      immutable: true,
    },
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
    // stock_over_date: {
    //   type: Date,
    //   required: false,
    // },
    stock_process_level: {
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

const RawMaterialStockHistory =
  mongoose.model.RawMaterialStockHistory ||
  mongoose.model("RawMaterialStockHistory", raw_material_stock_historySchema);

export default RawMaterialStockHistory;
