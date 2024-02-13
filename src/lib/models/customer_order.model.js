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
    check_no: {
      type: String,
      required: false,
    },
    transaction_no: {
      type: String,
      required: false,
    },
    order_state: {
      type: String,
      enum: {
        values: ["none", "pending", "packed", "shiped", "complete"],
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
    total_mrp: {
      type: Number,
      required: true,
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
    net_price: {
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
  mongoose.model.CustomerOrder ||
  mongoose.model("CustomerOrder", customer_orderSchema);

export default CustomerOrder;
