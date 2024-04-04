import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { MdCreate, MdDelete, MdUpdate } from "react-icons/md";
import NewDepartment from "./NewDepartment";

export default function Page({ params: { id } }) {
  console.log(id);
  // ! fetch data of this id[0] here and send it to the update department componnet

  const departments = [
    {
      _id: "asfwe32wafgr34swf4as",
      manager: { name: "kuldip", _id: "efdsf34a" },
      dept_name: "fabric-manufacturing",
      used_material_id: [{ name: "rajapuri keri" }, { name: "kesar keri" }],
      produced_material_id: [
        { name: "ready made keri ras" },
        { name: "keri no ras kadho" },
      ],
      produced_product_id: [
        { name: "gokul no ras" },
        { name: "gir ni special keri" },
        { name: "laal desi keri" },
      ],
      production_process_level: 1,
      raw_material_used_level: 1,
      produced_material_level: 2,
      prev_managers_id: [
        { name: "kuldip", _id: "efdsf34a" },
        { name: "rajdeep", _id: "efdsf34asd3" },
      ],
    },
    {
      _id: "asfwe32w3rweafswf4as",
      manager: { name: "kuldip", _id: "efdsf34a" },
      dept_name: "cleaning-&-finishing",
      used_material_id: [
        { name: "hafus keri" },
        { name: "rajapuri keri" },
        { name: "kesar keri" },
      ],
      produced_material_id: [
        { name: "ready made keri ras" },
        { name: "keri no ras kadho" },
      ],
      produced_product_id: [
        { name: "gokul no ras" },
        { name: "gir ni special keri" },
      ],
      production_process_level: 1,
      raw_material_used_level: 1,
      produced_material_level: 2,
      prev_managers_id: [
        { name: "kuldip", _id: "efdsf34a" },
        { name: "rajdeep", _id: "efdsf34asd3" },
      ],
    },
    {
      _id: "asfwe345f2wafswf4as",
      manager: { name: "kuldip", _id: "efdsf34a" },
      dept_name: "Dying-&-printing",
      used_material_id: [
        { name: "hafus keri" },
        { name: "rajapuri keri" },
        { name: "kesar keri" },
      ],
      produced_material_id: [
        { name: "ready made keri ras" },
        { name: "keri no ras kadho" },
      ],
      produced_product_id: [
        { name: "gokul no ras" },
        { name: "gir ni special keri" },
      ],
      production_process_level: 1,
      raw_material_used_level: 1,
      produced_material_level: 2,
      prev_managers_id: [
        { name: "kuldip", _id: "efdsf34a" },
        { name: "rajdeep", _id: "efdsf34asd3" },
      ],
    },
    {
      _id: "asfwe32wadggfgs3fswf4as",
      manager: { name: "kuldip", _id: "efdsf34a" },
      dept_name: "cutting",
      used_material_id: [
        { name: "hafus keri" },
        { name: "rajapuri keri" },
        { name: "dasheri keri" },
        { name: "kesar keri" },
      ],
      produced_material_id: [
        { name: "ready made keri ras" },
        { name: "keri no ras kadho" },
      ],
      produced_product_id: [
        { name: "gokul no ras" },
        { name: "gir ni special keri" },
      ],
      production_process_level: 1,
      raw_material_used_level: 1,
      produced_material_level: 2,
      prev_managers_id: [
        { name: "kuldip", _id: "efdsf34a" },
        { name: "rajdeep", _id: "efdsf34asd3" },
      ],
    },
    {
      _id: "asfwe32wafsew322wf4as",
      manager: { name: "kuldip", _id: "efdsf34a" },
      dept_name: "sewing",
      used_material_id: [{ name: "hafus keri" }, { name: "rajapuri keri" }],
      produced_material_id: [
        { name: "ready made keri ras" },
        { name: "keri no ras kadho" },
        { name: "galle thi leta aavo" },
      ],
      produced_product_id: [
        { name: "gokul no ras" },
        { name: "gir ni special keri" },
      ],
      production_process_level: 1,
      raw_material_used_level: 1,
      produced_material_level: 2,
      prev_managers_id: [
        { name: "kuldip", _id: "efdsf34a" },
        { name: "rajdeep", _id: "efdsf34asd3" },
      ],
    },
  ];

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
                <b>MANAGER : </b> {dept?.manager?.name} / {dept?.manager?._id}
              </span>
              <span className="flex  flex-row flex-nowrap gap-1">
                <b>USED MATERIALS : </b>
                <span className="flex flex-col">
                  {dept?.used_material_id?.map((material) => (
                    <span key={material?.name}>&rarr; {material?.name}</span>
                  ))}
                </span>
              </span>
              <span className="flex  flex-row flex-nowrap gap-1">
                <b>PRODUCED MATERIALS : </b>
                <span className="flex flex-col">
                  {dept?.produced_material_id?.map((material) => (
                    <span key={material?.name}>&rarr; {material?.name}</span>
                  ))}
                </span>
              </span>
              <span className="flex  flex-row flex-nowrap gap-1">
                <b>PRODUCED PRODUCT : </b>
                <span className="flex flex-col">
                  {dept?.produced_product_id?.map((material) => (
                    <span key={material?.name}>&rarr; {material?.name}</span>
                  ))}
                </span>
              </span>
              <span>
                <b>MATERIAL USED LEVEL : </b> {dept?.raw_material_used_level}
              </span>
              <span>
                <b>MATERIAL PRODUCED LEVEL : </b>{" "}
                {dept?.produced_material_level}
              </span>
              <span className="flex  flex-row flex-nowrap gap-1">
                <b>PREVIOUS MANAGERS : </b>
                <span className="flex flex-col">
                  {dept?.prev_managers_id?.map((manager) => (
                    <span key={manager?._id}>&rarr; {manager?.name}</span>
                  ))}
                </span>
              </span>
              <span>
                <Button
                  as={Link}
                  href={"/admin/departments/" + dept?._id}
                  variant="shadow"
                  color="secondary"
                  size="sm"
                  startContent={<MdUpdate />}
                >
                  U P D A T E
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="shadow"
                  color="secondary"
                  size="sm"
                  startContent={<MdDelete />}
                >
                  D E L E T E
                </Button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 mt-10  gap-2 grid grid-cols-1 row-auto m-auto">
        <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          {id?.[0] ? "UPDATE DEPARTMENTS : " + id[0] : "CREATE DEPARTMENTS"}
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
            _id: "asfwe32wafgr34swf4as",
            manager: { name: "kuldip", _id: "efdsf34a" },
            dept_name: "fabric-manufacturing",
            used_material_id: ["rajapuri keri", "kesar keri"],
            produced_material_id: ["ready made keri ras", "keri no ras kadho"],
            produced_product_id: [
              "gokul no ras",
              "gir ni special keri",
              "laal desi keri",
            ],
            production_process_level: 1,
            raw_material_used_level: 1,
            produced_material_level: 2,
          }}
        />
      </div>
    </div>
  );
}
