import mongoose from "mongoose";
const Schema = mongoose.Schema;
const supplierSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
      immutable: true,
    },
    supplied_material_id: {
      type: [Schema.ObjectId],
      ref: "RawMaterial",
      required: false,
    },
    // prev_material_orders: {
    //   type: [Schema.ObjectId],
    //   ref: "RawMaterialOrder",
    //   required: false,
    // },
    total_completed_orders: {
      type: Number,
      required: true,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
    address: {
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

const Supplier =
  mongoose.model.Supplier || mongoose.model("Supplier", supplierSchema);

export default Supplier;
