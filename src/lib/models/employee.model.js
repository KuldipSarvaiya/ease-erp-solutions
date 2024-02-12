import mongoose from "mongoose";
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        messages: "\n**********Gender is Not valid",
      },
      required: true,
    },
    dob: {
      type: Date,
      validate: {
        validator: (v) =>
          Math.abs(
            new Date(v).getFullYear() - new Date(Date.now()).getFullYear()
          ) >= 18,
        message: (props) => `${props.name} is not a valid dob ${props.value}`,
      },
      required: true,
    },
    doj: {
      type: Date,
      default: new Date(),
      required: true,
    },
    prev_experience: {
      type: Number,
      required: true,
      default: 0,
    },
    expert_area: {
      type: String,
      required: false,
    },
    course_studied: {
      type: String,
      required: false,
    },
    designation: {
      type: String,
      enum: {
        values: ["Employee", "Manager"],
        message: (props) => `${props.name} is not set to ${props.value}`,
      },
      required: true,
    },
    attendance_coordinates: {
      type: [String],
      required: [true, "\n*******Attendance Coordinates are required"],
      validate: {
        validator: (v) => v.lenth === 2,
        message: (props) =>
          `\n*******${props.name} :  is not a valid , invalid = ${props.value}`,
        minlength: 2,
      },
    },
    attendance_radius: {
      type: Number,
      required: true,
      default: 100,
    },
    basic_salary: {
      type: Number,
      required: true,
    },
    department_id: {
      type: Schema.ObjectId,
      ref: "Department",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
    home_address: {
      type: String,
      required: true,
    },
    bank_acc_no: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    bank_ifsc_code: {
      type: String,
      required: false,
    },
    pan_no: {
      type: String,
      required: true,
    },
    salary_id: {
      type: [Schema.ObjectId],
      ref: "Salary",
      required: false,
    },
    salary_cut_per_day: {
      type: Number,
      required: true,
      default: 0,
    },
    attendance_id: {
      type: [Schema.ObjectId],
      ref: "Attendance",
      required: false,
    },
    ot_salary_per_hour: {
      type: Number,
      required: true,
      default: 0,
    },
    allowed_leave_per_month: {
      type: Number,
      required: true,
      default: 2, // Default is set to 2 for all employees
    },
    username: {
      type: String,
      required: true,
      default: "new_employee",
    },
    password: {
      type: String,
      required: true,
      default: "password",
    },
    image: {
      type: String,
      required: false,
    },
    leave_report_id: {
      type: [Schema.ObjectId],
      ref: "LeaveReport",
      required: false,
    },
    is_ex_employee: {
      type: Boolean,
      required: true,
      default: false,
    },
    date_of_resign: Date,
    reason_for_resign: String,
    task_id: {
      type: [Schema.ObjectId],
      ref: "Task",
      required: false,
    },
    notice: [String],
  },
  { timestamps: true }
);

const Employee =
  mongoose.model.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
