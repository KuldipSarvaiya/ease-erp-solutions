import mongoose from "mongoose";
const Schema = mongoose.Schema;
const customer_orderSchema = new Schema(
  {
    customer_id: {
      type: Schema.ObjectId,
      ref: "Customer",
      required: true,
      immutable: true,
    },
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
      immutable: true,
    },
    units: {
      type: Number,
      required: true,
    },
    payment_mode: {
      type: String,
      enum: {
        values: ["online", "check", "cod"],
        message: (props) => `${props.name} is not set to ${props.value}`,
      },
      required: false,
      immutable: true,
    },
    order_id: {
      type: String,
      required: false,
    },
    razorpay_payment_id: {
      type: String,
      required: false,
    },
    order_state: {
      type: String,
      enum: {
        values: ["none", "canceled", "pending", "packed", "shiped", "complete"],
        message: (props) => `${props.name} is not set to ${props.value}`,
      },
      default: "none",
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
      immutable: true,
    },
    sub_total: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    // delivery_charge: {
    //   type: Number,
    //   required: true,
    // },
    discount: {
      type: Number,
      required: true,
    },
    net_total: {
      type: Number,
      required: true,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CustomerOrder =
  mongoose.models.CustomerOrder ||
  mongoose.model("CustomerOrder", customer_orderSchema);

export default CustomerOrder;
