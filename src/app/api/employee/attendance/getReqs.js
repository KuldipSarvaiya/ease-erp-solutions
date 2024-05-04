import Attendance from "@/lib/models/attendance.model";
import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";

export async function myToday(id) {
  const res = await Attendance.findOne({
    employee_id: id,
    date: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      $lte: new Date(new Date().setHours(24, 0, 0, 0)),
    },
  }).populate({
    path: "employee_id",
    select: "attendance_coordinates attendance_radius",
  });
  // console.log("*******employee today attendance = ", res);
  return res;
}

export async function myOld(id) {
  const res = await Attendance.find({
    employee_id: id,
    date: {
      $lte: new Date(),
    },
    state: { $ne: "pending" },
  });
  return res;
}

export async function allEmpGroupDept() {
  await connectDB();

  const res = await Employee.aggregate([
    {
      $match: {
        designation: { $ne: "Admin" },
        is_ex_employee: { $ne: true },
      },
    },
    {
      $lookup: {
        from: "attendances",
        let: {
          employeeId: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$employee_id", "$$employeeId"],
                  },
                  {
                    $eq: [
                      {
                        $dayOfYear: "$createdAt",
                      },
                      {
                        $dayOfYear: new Date(),
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: "attendance",
      },
    },
    {
      $project: {
        _id: 1,
        attendance: 1,
        first_name: 1,
        middle_name: 1,
        image: 1,
        department_id: 1,
        designation: 1,
      },
    },
    {
      $unwind: {
        path: "$attendance",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$department_id",
        employees: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "_id",
        as: "department",
        pipeline: [
          {
            $project: {
              _id: 1,
              dept_name: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$department"],
        },
      },
    },
    {
      $project: {
        _id: 1,
        dept_name: 1,
        employees: 1,
      },
    },
  ]);

  return res;
}
