"use server";

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
  console.log(formdata.get("reason_for_resign"));
}
