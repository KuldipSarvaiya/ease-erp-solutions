"use server";

import LeaveReport from "@/lib/models/leave_report.model";
import connectDB from "@/lib/mongoose";
import { revalidateTag } from "next/cache";

export async function applyLeave(formdata) {
  await connectDB();

  const report = new LeaveReport({
    requested_by: formdata.get("emp"),
    dates_of_leave: formdata.getAll("dates_of_leave"),
    reason: formdata.get("reason"),
    total_leave_days: formdata.get("total_leave_days"),
    updated_by: formdata.get("emp"),
  });

  const res = await report.save();

  // console.log(res);

  revalidateTag("my-leave-report")

  return true;
}
