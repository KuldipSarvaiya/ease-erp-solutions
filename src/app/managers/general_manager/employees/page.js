import { Divider } from "@nextui-org/react";
import GMEmployeeCard from "./GMEmployeeCard";

export default function EmpPage() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* employees details of this department */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">
          EMPLOYEES DETAILS
        </p>
        <Divider className="my-3" />
        <div className="grid manager_inventory_product_stock w-full gap-3 ">
          <GMEmployeeCard />
          <GMEmployeeCard />
          <GMEmployeeCard />
          <GMEmployeeCard />
          <GMEmployeeCard /> 
        </div>
      </div>
    </div>
  );
}
