import { options } from "@/app/api/auth/[...nextauth]/options";
import Employee from "@/lib/models/employee.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Avatar, Chip, Divider, Textarea } from "@nextui-org/react";
import { FaDotCircle } from "react-icons/fa";
import { revalidateTag } from "next/cache";
import Task from "@/lib/models/task.model";
import SubmitBtn from "./SubmitBtn";

export default async function Page() {
  const colors = {
    pending: "text-yellow-500",
    present: "text-emerald-500",
    onleave: "text-red-500",
    "": "text-white",
  };
  const session = await getServerSession(options);

  await connectDB();
  const employees = await Employee.aggregate([
    {
      $match: {
        designation: "Manager",
      },
    },
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
          {
            $project: {
              state: 1,
              _id: 0,
            },
          },
        ],
        as: "attendance",
      },
    },
    {
      $project: {
        _id: 1,
        first_name: 1,
        middle_name: 1,
        image: 1,
        attendance: 1,
        department: {
          dept_name: 1,
        },
      },
    },
  ]);

  console.log("employee = ", employees);
  async function handleSubmit(formdata) {
    "use server";

    const isTask = formdata.get("task") !== null;
    const isNotice = formdata.get("notice") !== null;
    const text = formdata.get("text");
    const employee_ids = formdata.getAll("employees");

    await connectDB();
    // send notice
    if (isNotice) {
      const res = await Employee.updateMany(
        { _id: { $in: employee_ids } },
        {
          $push: {
            notice: text,
          },
        }
      );

      console.log(res);
      if (res.acknowledged) revalidateTag("myNotice");
    }
    // assign task
    if (isTask) {
      const data = employee_ids.map((item) => ({
        date: new Date(),
        assigned_employee_id: item,
        text: text,
        updated_by: session.user._id,
      }));

      const res = await Task.insertMany(data);

      console.log(res);
    }
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* pending tasks */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">ASSIGN TASKS</p>
        <Divider className="my-3" />
        <div>
          <form action={handleSubmit} className="flex flex-col gap-5">
            <Textarea
              label="Task / Notice   Text"
              labelPlacement="inside"
              name="text"
              color="secondary"
              variant="faded"
              isRequired
              aria-label="employee task text"
              aria-labelledby="employee task text"
              cols={70}
              className="max-w-max"
            />
            <span className="text-lg font-semibold">Select Managers : </span>
            <div className="flex flex-row flex-wrap gap-4 ">
              {employees?.map((emp, i) => (
                <Chip
                  key={emp?._id + i}
                  variant="faded"
                  color="secondary"
                  size="md"
                  aria-label="employee chip"
                  aria-labelledby="employee chip"
                  startContent={
                    <input
                      type="checkbox"
                      name="employees"
                      value={emp?._id.toString()}
                      className="accent-purple-500 cursor-pointer scale-150 ml-2"
                      aria-label="employee checkbox"
                      aria-labelledby="employee checkbox"
                    />
                  }
                  endContent={
                    <FaDotCircle className={colors[emp?.attendance]+" scale-150 mr-2"} />
                  }
                  className="h-fit p-1"
                >
                  <span className="flex gap-2 items-center capitalize">
                    &nbsp;
                    <Avatar
                      size="md"
                      src={"/kuldip_upload/" + emp?.image}
                      aria-label="employee avatar"
                      aria-labelledby="employee avatar"
                    />
                    <span>
                      {emp?.middle_name}&nbsp;{emp?.first_name}
                      <p className="uppercase">{emp?.department?.dept_name}</p>
                    </span>
                    &nbsp;
                  </span>
                </Chip>
              ))}
            </div>
            <SubmitBtn />
          </form>
        </div>
      </div>
    </div>
  );
}
