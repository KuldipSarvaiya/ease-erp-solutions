import { NextResponse } from "next/server";

export async function POST(request) {
  const formdata = await request.formData();

  console.log("Department POST = ", formdata.get("dept_name"));

  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const formdata = await request.formData();

  console.log("Department PUT = ", formdata.get("dept_name"));

  return NextResponse.json({ dept_name: "This Department Already Exists" });
}
