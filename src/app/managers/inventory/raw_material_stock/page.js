import Download from "@/components/Dowload";
import HistoryTable from "./HistoryTable";
import { Divider } from "@nextui-org/react";
import RawMaterialSmall from "@/components/cards/RawMaterialSmall";

export default function Page() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/*  products  */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          RAW MATERIALS STOCK <Download />
        </div>
        <Divider className="my-2" />

        <div className="grid gap-3 w-full manager_inventory_product_stock">
          <RawMaterialSmall />
          <RawMaterialSmall />
          <RawMaterialSmall />
          <RawMaterialSmall />
        </div>
      </div>
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          RAW MATERIALS STOCK HISTORY <Download />
        </div>
        <Divider className="my-2" />
        <div className="w-full">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
