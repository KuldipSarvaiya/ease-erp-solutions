import LeaveReport from "@/lib/models/leave_report.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const id = new URL(req.url).searchParams.get("_id");

  if (!!!id) return NextResponse.error("No Reports Found");

  const reports = await LeaveReport.find({ requested_by: id });

  if (!!!reports) return NextResponse.error("No Reports Found");

  return NextResponse.json(reports);
}
