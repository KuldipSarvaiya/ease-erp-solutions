"use server";

import { revalidatePath } from "next/cache";

export async function changeAttendanceStatus(formdata) {
  console.log(formdata.get("id"));
  console.log(formdata.get("status"));
  revalidatePath("/managers/hr/attendance")
}
