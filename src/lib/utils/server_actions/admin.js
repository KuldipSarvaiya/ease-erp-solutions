"use server";

import Department from "@/lib/models/department.model";
import Employee from "@/lib/models/employee.model";
import RawMaterial from "@/lib/models/raw_material.model";
import connectDB from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export async function changeManager(formdata) {
  const current_manager = formdata.get("current_manager");
  const new_manager = formdata.get("new_manager");
  const department = formdata.get("department");
  const updated_by = formdata.get("updated_by");

  const managers = [new_manager];
  current_manager && managers.push(current_manager);

  await connectDB();
  const result = await Employee.updateMany(
    {
      _id: { $in: managers },
    },
    [
      {
        $set: {
          designation: {
            $cond: {
              if: { $eq: ["$designation", "Employee"] },
              then: "Manager",
              else: "Employee",
            },
          },
          updated_by: updated_by,
        },
      },
    ]
  );

  const prevMan = await Department.updateOne(
    { _id: department },
    {
      $push: { prev_managers_id: current_manager },
      $set: {
        updated_by: updated_by,
      },
    }
  );

  console.log("Managers Updated = ", result.acknowledged);
  console.log("Prev Managers Updated = ", prevMan.acknowledged);

  revalidatePath("/admin/managers");
  return result.acknowledged && prevMan.acknowledged;
}

export async function changeDesignation(formdata) {
  const id = formdata.get("employee_id");
  const updated_by = formdata.get("updated_by");
  const designation = formdata.get("designation");

  const res = await Employee.updateOne(
    { _id: id },
    {
      $set: {
        designation: designation,
        updated_by: updated_by,
      },
      $push: {
        notice: `Hey, Lets Get You Know That You Are Officially ${designation} Now`,
      },
    }
  );

  console.log(res);
  if (res.acknowledged) revalidatePath("/admin/employees");
  return res.acknowledged;
}

export async function deleteDepartment(formdata) {
  const dept_id = formdata.get("department_id");
  await connectDB();

  const emps = await Employee.find({ department_id: dept_id }).countDocuments();
  const materials = await RawMaterial.find({
    $or: [{ produced_by: dept_id }, { $in: { used_by: dept_id } }],
  }).countDocuments();
  console.log(emps, materials);
  if (emps <= 0 && materials <= 0) {
    const ddpt = await Department.deleteOne({ _id: dept_id });
    console.log(ddpt);
    revalidatePath("/admin/departments/");
    return ddpt.acknowledged;
  }
}
