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
      type: [String],
      validate: {
        minlength: 2,
      },
    },
    order_id: {
      type: [Schema.ObjectId],
      required: false,
    }, 
  },
  { timestamps: true }
);

const Customer =
  mongoose.model.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
