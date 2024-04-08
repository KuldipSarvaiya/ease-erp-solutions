"use server";

import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export async function declareHoliday(formdata) {
  console.log(formdata.get("date"));
  return "holiday is announced";
}

export async function announceEvent(formdata) {
  console.log("event");
  console.log(formdata.get("details").split("\n").length);
  return false;
}

export async function changeAttendanceStatus(formdata) {
  console.log(formdata.get("id"));
  console.log(formdata.get("status"));
  revalidatePath("/managers/hr/attendance");
}

export async function resignEmployee(formdata) {
  const reason = formdata.get("reason_for_resign");
  const id = formdata.get("id");

  await connectDB();

  const update = await Employee.updateOne(
    { _id: id },
    {
      reason_for_resign: reason,
      is_ex_employee: true,
      date_of_resign: new Date(),
      updated_by: formdata.get("updated_by"),
      notice: [],
      password: "ex_employee@" + id,
    }
  );

  if (update.acknowledged) {
    revalidatePath("/mamangers/hr/manage_employee");
    return { success: true };
  }
  return "Failed to Resign Employee";
}
