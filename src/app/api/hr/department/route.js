import Department from "@/lib/models/department.model.js";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const depts = await Department.find({}).select("dept_name _id production_process_level");
  // console.log(depts);
  return NextResponse.json(depts);
}
