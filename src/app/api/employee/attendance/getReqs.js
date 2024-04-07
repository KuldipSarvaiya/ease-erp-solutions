import Attendance from "@/lib/models/attendance.model";

export async function myToday(id) {
  const res = await Attendance.findOne({
    employee_id: id,
    date: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      $lte: new Date(new Date().setHours(24, 0, 0, 0)),
    },
  });
  return res;
}

export async function myOld(id) {
  const res = await Attendance.find({
    employee_id: id,
    date: {
      $gte: new Date(),
    },
    // state: { $ne: "pending" },
  });
  return res;
}
