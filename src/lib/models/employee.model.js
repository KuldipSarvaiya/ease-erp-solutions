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
      immutable: true,
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
      immutable: true,
    },
    prev_experience: {
      type: Number,
      required: true,
      immutable: true,
      default: 0,
    },
    expert_area: {
      type: String,
      required: false,
      immutable: true,
    },
    course_studied: {
      type: String,
      required: false,
      immutable: true,
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
      type: Object,
      required: true,
      properties: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
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
    rezorpay_contact_id: {
      type: String,
      required: [
        true,
        "\n\n**********RAZORPAY contact id is required, get is by creating contact in razorpay for this employee",
      ],
      immutable: true,
    },
    rezorpay_fund_id: {
      type: String,
      required: [
        true,
        "\n\n**********RAZORPAY fund id is required, get is by creating fund in razorpay for this employee",
      ],
      immutable: true,
    },
    // salary_id: {
    //   type: [Schema.ObjectId],
    //   ref: "Salary",
    //   required: false,
    // },
    salary_cut_per_day: {
      type: Number,
      required: true,
      default: 0,
    },
    // attendance_id: {
    //   type: [Schema.ObjectId],
    //   ref: "Attendance",
    //   required: false,
    // },
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
      immutable: false,
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
    // leave_report_id: {
    //   type: [Schema.ObjectId],
    //   ref: "LeaveReport",
    //   required: false,
    // },
    is_ex_employee: {
      type: Boolean,
      required: true,
      default: false,
    },
    date_of_resign: {
      type: Date,
      required: false,
    },
    reason_for_resign: {
      type: String,
      required: false,
    },
    // task_id: {
    //   type: [Schema.ObjectId],
    //   ref: "Task",
    //   required: false,
    // },
    notice: { type: [String], required: false },
    updated_by: {
      type: Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Employee =
  mongoose.model.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
