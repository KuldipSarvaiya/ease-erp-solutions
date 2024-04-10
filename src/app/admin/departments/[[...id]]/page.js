import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { MdCreate, MdDelete, MdUpdate } from "react-icons/md";
import NewDepartment from "./NewDepartment";
import Department from "@/lib/models/department.model";
import { deleteDepartment } from "@/lib/utils/server_actions/admin";

export default async function Page({ params: { id } }) {
  console.log(id);

  // ? this pipeline only gets details of manager not about materials
  const departments = await Department.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "department_id",
        as: "manager",
      },
    },
    {
      $project: {
        manager: {
          $filter: {
            input: "$manager",
            cond: {
              $eq: ["$$this.designation", "Manager"],
            },
          },
        },
        prev_managers_id: 1,
        _id: 1,
        production_process_level: 1,
        dept_name: 1,
        raw_material_used_level: 1,
        produced_material_level: 1,
      },
    },
    {
      $unwind: {
        path: "$manager",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$prev_managers_id",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "prev_managers_id",
        foreignField: "_id",
        as: "prev_managers",
      },
    },
  ]);

  console.log(departments);

  const id_dept = departments?.find((d) => d?._id.toString() === id?.[0]);
  console.log(id_dept);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500  gap-2 grid grid-cols-1 row-auto m-auto">
        <p className="text-2xl font-bold tracking-wide w-full">
          MANAGE DEPARTMENTS
        </p>
        <Divider className="my-3" />

        {/* department cards */}
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-y-5 justify-items-center">
          {departments?.map((dept) => (
            <div
              key={dept?._id}
              className="p-2 flex flex-col text-xs gap-1 bg-purple-100/10 backdrop-blur-2xl rounded-xl border-1 border-purple-400 min-w-80 max-w-[350px] hover:bg-purple-200/20"
            >
              <span className="uppercase text-sm font-medium">
                <b>DEPARTMENT : </b>
                {dept?.dept_name.replaceAll("-", " ")}
              </span>
              <span>
                <b>PRODUCTION PROCESS LEVEL : </b>{" "}
                {dept?.production_process_level}
              </span>
              <span className="capitalize">
                <b>MANAGER : </b> {dept?.manager?.first_name}{" "}
                {dept?.manager?.middle_name} {/* {dept?.manager?._id}*/}
              </span>
              {!["hr", "finance", "inventory"].includes(dept?.dept_name) && (
                <>
                  <span className="flex  flex-row flex-nowrap gap-1">
                    <b>USED MATERIALS : </b>
                    <span className="flex flex-col">
                      {dept?.used_material_id?.map((material) => (
                        <span key={material?.name}>
                          &rarr; {material?.name}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="flex  flex-row flex-nowrap gap-1">
                    <b>PRODUCED MATERIALS : </b>
                    <span className="flex flex-col">
                      {dept?.produced_material_id?.map((material) => (
                        <span key={material?.name}>
                          &rarr; {material?.name}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="flex  flex-row flex-nowrap gap-1">
                    <b>PRODUCED PRODUCT : </b>
                    <span className="flex flex-col">
                      {dept?.produced_product_id?.map((material) => (
                        <span key={material?.name}>
                          &rarr; {material?.name}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span>
                    <b>MATERIAL USED LEVEL : </b>{" "}
                    {dept?.raw_material_used_level}
                  </span>
                  <span>
                    <b>MATERIAL PRODUCED LEVEL : </b>{" "}
                    {dept?.produced_material_level}
                  </span>
                </>
              )}
              <span className="flex  flex-row flex-nowrap gap-1">
                <b>PREVIOUS MANAGERS : </b>
                <span className="flex flex-col">
                  {dept?.prev_managers?.map((manager) => (
                    <span key={manager?._id}>
                      &rarr; {manager?.first_name + " " + manager?.middle_name}
                    </span>
                  ))}
                </span>
              </span>
              {!["hr", "finance", "inventory"].includes(dept?.dept_name) && (
                <span className="flex flex-row gap-3">
                  <Button
                    as={Link}
                    href={"/admin/departments/" + dept?._id}
                    variant="shadow"
                    color="secondary"
                    size="sm"
                    title="Updae Dept Details"
                    startContent={<MdUpdate />}
                  >
                    U P D A T E
                  </Button>
                  <form action={deleteDepartment}>
                    <input
                      hidden
                      readOnly
                      defaultValue={dept?._id?.toString()}
                      name="department_id"
                      type="text"
                      required
                    />
                    <Button
                      type="submit"
                      variant="shadow"
                      color="secondary"
                      size="sm"
                      title="Make Sure To Shift Employees / Materials To Other Dept. This will not Delete Dept If Any Employee is Here"
                      startContent={<MdDelete />}
                    >
                      D E L E T E
                    </Button>
                  </form>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 mt-10  gap-2 grid grid-cols-1 row-auto m-auto">
        <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          {id?.[0]
            ? "UPDATE DEPARTMENTS : " + id_dept?.dept_name
            : "CREATE DEPARTMENTS"}
          {id?.[0] && (
            <Button
              as={Link}
              href={"/admin/departments"}
              variant="shadow"
              color="secondary"
              size="sm"
              startContent={<MdCreate />}
            >
              CREATE DEPARTMENT
            </Button>
          )}
        </p>
        <Divider className="my-3" />
        <NewDepartment
          id={id?.[0]}
          data={{
            dept_name: id_dept?.dept_name?.replaceAll("-", " "),
            production_process_level: id_dept?.production_process_level,
            raw_material_used_level: id_dept?.raw_material_used_level,
            produced_material_level: id_dept?.produced_material_level,
          }}
        />
      </div>
    </div>
  );
}
