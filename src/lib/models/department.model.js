import mongoose from "mongoose";
const Schema = mongoose.Schema;
const general_dept_managerSchema = new Schema(
  {
    manager_id: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
    dept_name: {
      type: String,
      required: true,
      immutable: false,
      unique: true,
    },
    used_material_id: {
      type: [Schema.ObjectId],
      ref: "RawMaterial",
      required: true,
    },
    produced_material_id: {
      type: [Schema.ObjectId],
      ref: "RawMaterial",
      required: false,
    },
    produced_product_id: {
      type: [Schema.ObjectId],
      ref: "Product",
      required: false,
    },
    production_process_level: {
      type: Number,
      required: true,
    },
    raw_material_used_level: {
      type: Number,
      required: true,
    },
    produced_material_level: {
      type: Number,
      required: true,
    },
    prev_managers_id: {
      type: [Schema.ObjectId],
      ref: "Employee",
      required: false,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Department =
  mongoose.models.Department ||
  mongoose.model("Department", general_dept_managerSchema);

export default Department;
