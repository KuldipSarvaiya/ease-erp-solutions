import mongoose from "mongoose";
const Schema = mongoose.Schema;
const leave_reportSchema = new Schema(
  {
    requested_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
      immutable: true,
    },
    dates_of_leave: {
      type: [Date],
      required: true,
      immutable: true,
    },
    reason: {
      type: String,
      required: true,
      immutable: true,
    },
    leave_state: {
      type: String,
      required: true,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: (props) => `${props.name} is not set to ${props.value}`,
      },
    },
    total_leave_days: {
      type: Number,
      required: true,
      immutable: true,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LeaveReport =
  mongoose.models.LeaveReport ||
  mongoose.model("LeaveReport", leave_reportSchema);

export default LeaveReport;
