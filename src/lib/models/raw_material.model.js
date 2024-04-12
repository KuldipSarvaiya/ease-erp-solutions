import mongoose from "mongoose";
const Schema = mongoose.Schema;
const raw_materialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  raw_material_group_id: {
    type: String,
    required: true,
    immutable: true,
  },
  description: {
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
  chemical_property: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
    immutable: true,
  },
  unit_of_measurement: {
    type: String,
    required: true,
    immutable: true,
  },
  usage_process_level: {
    type: Number,
    required: true,
  },
  // supplier_id: {
  //   type: [Schema.ObjectId],
  //   ref: "Supplier",
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
  // raw_material_order_id: {
  //   type: [Schema.ObjectId],
  //   ref: "RawMaterialOrder",
  //   required: false,
  // },
  // raw_material_stock_id: {
  //   type: Schema.ObjectId,
  //   ref: "RawMaterailStock",
  //   required: false,
  // },
  updated_by: {
    type: Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const RawMaterial =
  mongoose.models.RawMaterial ||
  mongoose.model("RawMaterial", raw_materialSchema);

export default RawMaterial;
