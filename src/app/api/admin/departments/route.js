import Department from "@/lib/models/department.model.js";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formdata = await request.formData();

  console.log("Department POST = ", formdata.get("dept_name"));

  await connectDB();

  const dept = new Department({
    dept_name: formdata.get("dept_name").toLowerCase(),
    used_material_id: formdata.getAll("used_material_id"),
    produced_material_id: formdata.getAll("produced_material_id"),
    produced_product_id: formdata.getAll("produced_product_id"),
    production_process_level: formdata.get("production_process_level"),
    raw_material_used_level: formdata.get("raw_material_used_level"),
    produced_material_level: formdata.get("produced_material_level"),
    updated_by: "temp_id",
  });
  const res = await dept.save();

  console.log(res);

  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const formdata = await request.formData();

  console.log("Department PUT = ", formdata.get("dept_name"));

  return NextResponse.json({ dept_name: "This Department Already Exists" });
}
