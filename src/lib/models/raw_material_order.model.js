import mongoose from "mongoose";
const Schema = mongoose.Schema;
const raw_material_orderSchema = new Schema(
  {
    raw_material_id: {
      type: Schema.ObjectId,
      ref: "RawMaterial",
      required: true,
      immutable: true,
    },
    supplier_id: {
      type: Schema.ObjectId,
      ref: "Supplier",
      required: true,
      immutable: true,
    },
    bill_no: {
      type: String,
      required: true,
      immutable: true,
    },
    ordered_units: {
      type: Number,
      required: true,
      immutable: true,
    },
    order_ordered_date: {
      type: Date,
      required: true,
      immutable: true,
    },
    order_receive_date: {
      type: Date,
      required: true,
    },
    payment_mode: {
      type: String,
      enum: {
        values: ["inaccount", "check"],
        message: "Payment mode is not supported",
      },
      required: true,
      immutable: true,
    },
    check_no: {
      type: String,
      required: false,
    },
    transaction_no: {
      type: String,
      required: false,
    },
    mrp_per_unit: {
      type: Number,
      required: true,
      immutable: true,
    },
    total_tax: {
      type: Number,
      required: true,
    },
    delivery_charge: {
      type: Number,
      required: true,
    },
    total_discount: {
      type: Number,
      required: true,
    },
    net_bill_amount: {
      type: Number,
      required: true,
      immutable: true,
    },
    bill_image: {
      type: String,
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

const RawMaterialOrder =
  mongoose.model.RawMaterialOrder ||
  mongoose.model("RawMaterialOrder", raw_material_orderSchema);

export default RawMaterialOrder;
