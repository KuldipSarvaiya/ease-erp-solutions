import Download from "@/components/Dowload";
import HistoryTable from "./HistoryTable";
import { Divider } from "@nextui-org/react";
import RawMaterialSmall from "@/components/cards/RawMaterialSmall";
import connectDB from "@/lib/mongoose";
import RawMaterialStock from "@/lib/models/raw_material_stock.model";

export default async function Page() {
  await connectDB();

  const raw_material = await RawMaterialStock.aggregate([
    {
      $lookup: {
        from: "rawmaterials",
        localField: "raw_material_id",
        foreignField: "_id",
        as: "raw_material",
      },
    },
    {
      $unwind: "$raw_material",
    },
  ]);

  console.log(raw_material);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/*  raw materila stocks  */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch max-h-[85dvh] overflow-y-scroll">
        <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between ">
          RAW MATERIALS STOCK <Download />
        </div>
        <Divider className="my-2" />

        <div className="grid gap-3 w-full manager_inventory_product_stock">
          {raw_material?.map((item) => (
            <RawMaterialSmall key={item._id} material={item} />
          ))}
        </div>
      </div>
      <HistoryTable />
    </div>
  );
}
