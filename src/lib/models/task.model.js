import mongoose from "mongoose";
const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      immutable: true,
    },
    assigned_employee_id: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
      immutable: true,
    },
    text: {
      type: String,
      required: true,
      immutable: true,
    },
    is_complete: {
      type: String,
      required: true,
      default: false,
    },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
