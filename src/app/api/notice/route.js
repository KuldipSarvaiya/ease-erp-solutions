import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {
  const id = new URL(req.url).searchParams.get("_id");

  await connectDB();

  const notes = await Employee.findOne({ _id: id }).select("notice");

  if (!notes) return NextResponse.error("No Data Found");

  return NextResponse.json(notes);
}

export async function PUT(req) {
  const data = await req.json();

  await connectDB();

  const update = await Employee.updateOne(
    { _id: data._id },
    { $pull: { notice: data.notice } }
  );

  if (update.acknowledged) {
    revalidateTag("myNotice");
    return NextResponse.json(update);
  }

  return NextResponse.error("Notice did not Updated");
}
