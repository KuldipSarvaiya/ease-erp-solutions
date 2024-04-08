import { NextResponse } from "next/server";
import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import { writeFile } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { revalidateTag } from "next/cache";

// create new employees
export async function POST(request) {
  console.log("new employee");
  const formdata = await request.formData();
  const image = formdata.get("image");
  const image_name = `${Date.now()}__${image.name}`.replaceAll(" ", "-");
  const dept = formdata.get("department_id");
  console.log(dept);

  // todo : file upload to own backend server
  const arrBuf = await image.arrayBuffer();
  const buffer = new Buffer.from(arrBuf);

  const ulr = join(cwd(), "public", "kuldip_upload", image_name);
  writeFile(ulr, buffer, () => {
    console.log("file saved");
  });

  await connectDB();

  const createEmp = new Employee({
    image: image_name,
    first_name: formdata.get("first_name"),
    middle_name: formdata.get("middle_name"),
    last_name: formdata.get("last_name"),
    gender: formdata.get("gender"),
    dob: new Date(formdata.get("dob")),
    doj: new Date(),
    prev_experience: formdata.get("prev_experience"),
    expert_area: formdata.get("expert_area"),
    course_studied: formdata.get("course_studied"),
    designation: formdata.get("designation"),
    attendance_coordinates: {
      latitude: formdata.get("latitude"),
      longitude: formdata.get("longitude"),
    },
    attendance_radius: formdata.get("attendance_radius"),
    basic_salary: formdata.get("basic_salary"),
    department_id: formdata.get("department_id"),
    email: formdata.get("email"),
    contact_no: formdata.get("contact_no"),
    home_address: formdata.get("home_address"),
    bank_acc_no: formdata.get("bank_acc_no"),
    bank_name: formdata.get("bank_name"),
    bank_ifsc_code: formdata.get("bank_ifsc_code"),
    salary_cut_per_day: formdata.get("salary_cut_per_day"),
    ot_salary_per_hour: formdata.get("ot_salary_per_hour"),
    allowed_leave_per_month: formdata.get("allowed_leave_per_month"),
    username: formdata.get("username"),
    password: formdata.get("password"),
    updated_by: formdata.get("updated_by"),
    rezorpay_contact_id: "temp_id",
    rezorpay_fund_id: "temp_id",
  });

  const emp = await createEmp.save();

  console.log(emp);
  return NextResponse.json({ success: true });
}

export async function GET(req) {
  await connectDB();
  const employees = await Employee.aggregate([
    {
      $match: {
        is_ex_employee: false,
      },
    },
    {
      $group: {
        _id: "$department_id",
        employees: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $project: {
        _id: 1,
        dept_name: {
          $arrayElemAt: ["$department.dept_name", 0],
        },
        employees: 1,
      },
    },
    {
      $sort: {
        dept_namw: 1,
      },
    },
  ]);

  console.log(employees);
  if (!employees) return NextResponse.error("No Data Found");

  return NextResponse.json(employees);
}

export async function PUT(req) {
  const formdata = await req.formData();
  const image = formdata.get("image");
  const id = formdata.get("id");

  let image_obj = {};
  if (image.name) {
    // todo : file upload to own backend server
    const image_name = `${Date.now()}__${image.name}`.replaceAll(" ", "-");
    image_obj.image = image_name;

    const arrBuf = await image.arrayBuffer();
    const buffer = new Buffer.from(arrBuf);

    const ulr = join(cwd(), "public", "kuldip_upload", image_name);
    writeFile(ulr, buffer, () => {
      console.log("file saved");
    });
  }

  await connectDB();

  const update = await Employee.updateOne(
    { _id: id },
    {
      $set: {
        ...image_obj,
        first_name: formdata.get("first_name"),
        middle_name: formdata.get("middle_name"),
        last_name: formdata.get("last_name"),
        gender: formdata.get("gender"),
        // dob: new Date(formdata.get("dob")),
        // prev_experience: formdata.get("prev_experience"),
        expert_area: formdata.get("expert_area"),
        course_studied: formdata.get("course_studied"),
        // designation: formdata.get("designation"),
        attendance_coordinates: {
          latitude: formdata.get("latitude"),
          longitude: formdata.get("longitude"),
        },
        attendance_radius: formdata.get("attendance_radius"),
        basic_salary: formdata.get("basic_salary"),
        department_id: formdata.get("department_id"),
        email: formdata.get("email"),
        contact_no: formdata.get("contact_no"),
        home_address: formdata.get("home_address"),
        bank_acc_no: formdata.get("bank_acc_no"),
        bank_name: formdata.get("bank_name"),
        bank_ifsc_code: formdata.get("bank_ifsc_code"),
        salary_cut_per_day: formdata.get("salary_cut_per_day"),
        ot_salary_per_hour: formdata.get("ot_salary_per_hour"),
        allowed_leave_per_month: formdata.get("allowed_leave_per_month"),
        username: formdata.get("username"),
        password: formdata.get("password"),
        updated_by: formdata.get("updated_by"),
        rezorpay_contact_id: "temp_id",
        rezorpay_fund_id: "temp_id",
      },
    }
  );
  console.log(update);
  if (update.acknowledged) {
    revalidateTag("UpdateEmployees");
    return NextResponse.json({ success: true });
  }
  return NextResponse.error("Failed To Update Details");
}
