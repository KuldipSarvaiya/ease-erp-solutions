import { Divider } from "@nextui-org/react";
import DisplayTable from "./DisplayTable";
import Employee from "@/lib/models/employee.model";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
export default async function EmployeeAdminPage() {
  const session = await getServerSession(options);
  const employees = await Employee.aggregate([
    {
      $lookup: {
        from: "departments",
        localField: "department_id",
        foreignField: "_id",
        as: "department",
      },
    },
    {
      $unwind: {
        path: "$department",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$designation",
        employees: { $push: "$$ROOT" },
      },
    },
    {
      $addFields: {
        designation: {
          $toString: "$_id",
        },
      },
    },
    {
      $project: {
        __v: 0,
        department_id: 0,
        updated_by: 0,
        _id: 0,
      },
    },
  ]);

  // console.log(employees);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* admin table */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500  gap-2 grid grid-cols-1 row-auto m-auto">
        <p className="text-2xl font-bold tracking-wide w-full">ADMINS</p>
        <Divider className="my-3" />
        <DisplayTable
          data={
            employees?.filter(
              (d) => d?.designation?.toString() === "Admin"
            )?.[0]?.employees
          }
          remove={true}
          updated_by={session?.user?._id}
        />
      </div>

      {/* Manager table */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500  gap-2 grid grid-cols-1 row-auto m-auto mt-10">
        <p className="text-2xl font-bold tracking-wide w-full">MANAGERS</p>
        <Divider className="my-3" />
        <DisplayTable
          data={
            employees?.filter(
              (d) => d?.designation?.toString() === "Manager"
            )?.[0]?.employees
          }
          add={true}
          updated_by={session?.user?._id}
        />
      </div>

      {/* employee table */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500  gap-2 grid grid-cols-1 row-auto m-auto mt-10">
        <p className="text-2xl font-bold tracking-wide w-full">EMPLOYEES</p>
        <Divider className="my-3" />
        <DisplayTable
          data={
            employees?.filter(
              (d) => d?.designation?.toString() === "Employee"
            )?.[0]?.employees
          }
          add={true}
          updated_by={session?.user?._id}
        />
      </div>
    </div>
  );
}
