"use server";

import Attendance from "@/lib/models/attendance.model";
import Employee from "@/lib/models/employee.model";
import LeaveReport from "@/lib/models/leave_report.model";
import connectDB from "@/lib/mongoose";
import { revalidatePath, revalidateTag } from "next/cache";

export async function declareHoliday(formdata) {
  const date = new Date(formdata.get("date"));

  await connectDB();

  const emps = await Employee.find({}).select("_id");

  const attendances = [];
  for (const emp of emps) {
    attendances.push({
      employee_id: emp._id,
      date: date,
      state: "holiday",
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      point: 1,
      overtime_hours: 0,
      punch_in: new Date().setHours(0, 0, 0, 0),
      punch_out: new Date().setHours(24, 0, 0, 0), // set to midnight
      updated_by: formdata.get("updated_by"),
    });
  }

  const create = await Attendance.insertMany(attendances);

  // console.log(create);
  if (create.length === emps.length) return "holiday is announced";
  return "holiday is not announced";
}

export async function changeAttendanceStatus(formdata) {
  const _id = formdata.get("_id");
  const state = formdata.get("state");
  const overtime_hours = formdata.get("overtime_hours");
  const point = formdata.get("point");
  const updated_by = formdata.get("updated_by");

  let setObj = {
    updated_by: updated_by,
    state: state,
  };
  switch (state) {
    case "pending":
      setObj = {
        ...setObj,
        coordinates: {
          latitude: 1,
          longitude: 1,
          // latitude: 21.7631,
          // longitude: 72.1485,
        },
        punch_in: new Date(),
      };
      break;
    case "onleave":
      const create = new LeaveReport({
        requested_by: updated_by,
        dates_of_leave: [new Date()],
        reason: "This Leave is Assigned by HR Manager : " + updated_by,
        leave_state: "accepted",
        total_leave_days: 1,
        updated_by: updated_by,
      });
      const leave = await create.save();
      // console.log(leave);
      setObj = { ...setObj, leave_report_id: leave._id, point: 1 };
      break;
    case "present":
      setObj = {
        ...setObj,
        overtime_hours: overtime_hours,
        point: point,
        punch_out: new Date(),
      };
      break;
  }
  // console.log(setObj);

  await connectDB();
  if (state === "absent") {
    const del = await Attendance.deleteOne({ _id: _id });

    if (del.acknowledged)
      revalidateTag(["allEmployeeAttendance", "myTodayAttendance"]);
    return { success: del.acknowledged };
  }

  const res = await Attendance.updateOne({ _id: _id }, { $set: setObj });

  if (res.acknowledged) return true;
  return false;
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
