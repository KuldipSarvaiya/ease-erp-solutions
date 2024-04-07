import mongoose, { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Employee",
      required: [true, "\n*******Employee Id for Attendance is Required"],
      immutable: true,
    },
    date: {
      type: Date,
      required: [true, "\n*******Date for Attendance is Required"],
      immutable: true,
    },
    coordinates: {
      type: Object,
      required: true,
      properties: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
      },
      immutable: true,
    },
    state: {
      type: String,
      enum: {
        values: ["pending", "present", "onleave", "holiday"],
        message: (props) => `${props.name} is not set to ${props.value}`,
      },
      required: true,
      default: "pending",
    },
    leave_report_id: {
      type: mongoose.Schema.ObjectId,
      ref: "leave_report",
      required: false,
    },
    punch_in: {
      type: Date,
      required: true,
      default: new Date(),
      immutable: true,
    },
    punch_out: {
      type: Date,
      required: false,
      validate: {
        validator: (v) =>
          new Date(v).getDay() === new Date(this.punch_in).getDate(),
        message: (props) =>
          `${props.name} can not be ${props.value} | punch_in & punch_out must be same`,
      },
    },
    overtime_hours: {
      type: Number,
      required: false,
      default: 0,
    },
    point: {
      type: Number,
      enum: {
        values: [1, 0.5, 0],
        message: (props) => `${props.name} is not set to ${props.value}`,
      },
      default: 0,
      required: false,
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

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
