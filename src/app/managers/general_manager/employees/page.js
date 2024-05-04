import { Divider } from "@nextui-org/react";
import GMEmployeeCard from "./GMEmployeeCard";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Employee from "@/lib/models/employee.model";
import mongoose from "mongoose";
import connectDB from "@/lib/mongoose";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function EmpPage() {
  const session = await getServerSession(options);

  let department_id = session?.user?.department_id?._id;

  if (session?.user?.designation === "Admin") {
    department_id = cookies().get("department_id")?.value;
    if (!department_id) return notFound();
  }

  await connectDB();

  const employees = await Employee.aggregate([
    {
      $match: {
        designation: "Employee",
        is_ex_employee: false,
        department_id: new mongoose.Types.ObjectId(department_id),
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
      $unwind: {
        path: "$attendance",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  // console.log(employees);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* employees details of this department */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">
          EMPLOYEES DETAILS
        </p>
        <Divider className="my-3" />
        <div className="grid manager_inventory_product_stock w-full gap-3 ">
          {employees.length === 0 && (
            <b className="p-10 text-balance">
              No Employees Has Assigned To This Department {":("}
            </b>
          )}
          {employees?.map((employee) => (
            <GMEmployeeCard key={employee._id} emp={employee} />
          ))}
        </div>
      </div>
    </div>
  );
}
