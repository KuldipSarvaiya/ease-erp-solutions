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
    stock_date: {
      type: Date, 
      immutable: true,
      default: new Date(),
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
    produced_by: {
      type: [Schema.ObjectId],
      ref: "Department",
      required: false,
    },
    used_by: {
      type: [Schema.ObjectId],
      ref: "Department",
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
  mongoose.models.RawMaterialStockHistory ||
  mongoose.model("RawMaterialStockHistory", raw_material_stock_historySchema);

export default RawMaterialStockHistory;
