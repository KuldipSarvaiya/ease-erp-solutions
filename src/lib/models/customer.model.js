import mongoose from "mongoose";
const Schema = mongoose.Schema;
const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      immutable: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    address_coordinates: {
      type: Object,
      required: true,
      properties: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
      },
    },
    order_id: {
      type: [Schema.ObjectId],
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

const Customer =
  mongoose.model.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
