import mongoose from "mongoose";
const Schema = mongoose.Schema;
const raw_material_stockSchema = new Schema(
  {
    raw_material_id: {
      type: Schema.ObjectId,
      ref: "RawMaterial",
      required: true,
      immutable: true,
    },
    raw_material_stock_history_id: {
      type: [Schema.ObjectId],
      ref: "RawMaterialStockHistory",
      required: false,
    },
    last_stock_added_date: {
      type: Date,
      required: true,
      default: new Date(),
    },
    available_units: {
      type: Number,
      required: true,
    },
    stock_over_date: {
      type: Date,
      required: false,
    },
    produced_by: {
      type: Schema.ObjectId,
      ref: "Department",
      required: false, 
    },
    used_by: {
      type: Schema.ObjectId,
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

const RawMaterialStock =
  mongoose.model.RawMaterialStock ||
  mongoose.model("RawMaterialStock", raw_material_stockSchema);

export default RawMaterialStock;
