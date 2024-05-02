import Download from "@/components/Dowload";
import { Divider } from "@nextui-org/react";
import RawMaterialSmall from "@/components/cards/RawMaterialSmall";
import RMHistoryTable from "./RMHistoryTable";
import connectDB from "@/lib/mongoose";
import RawMaterialStock from "@/lib/models/raw_material_stock.model";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import mongoose from "mongoose";
import Product from "@/lib/models/product.model";
import ProductSmall from "@/components/cards/ProductSmall";
import PHistoryTable from "./PHistoryTable";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(options);
  
  let department_id = session?.user?.department_id?._id;

  if (session?.user?.designation === "Admin") {
    department_id = cookies().get("department_id")?.value;
    if (!department_id) return notFound();
  }


  await connectDB();

  const raw_material_P = RawMaterialStock.aggregate([
    {
      $match: {
        produced_by: {
          $in: [new mongoose.Types.ObjectId(department_id)],
        },
      },
    },
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

  const product_P = Product.find({
    produced_by: {
      $in: [new mongoose.Types.ObjectId(department_id)],
    },
  });

  const [raw_material, product] = await Promise.all([
    raw_material_P,
    product_P,
  ]);

  // console.log(raw_material);
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/*  produced raw material  */}
      {raw_material.length > 0 && (
        <>
          <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch max-h-[77dvh] overflow-y-scroll">
            <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
              PRODUCED RAW MATERIALS STOCK <Download />
            </div>
            <Divider className="my-2" />

            <div className="grid gap-3 w-full manager_inventory_product_stock">
              {raw_material?.map((item) => (
                <RawMaterialSmall
                  key={item._id}
                  no_decrement={true}
                  material={item}
                />
              ))}
            </div>
          </div>
          <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
            <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
              PRODUCED RAW MATERIALS STOCK HISTORY <Download />
            </div>
            <Divider className="my-2" />
            <div className="w-full">
              <RMHistoryTable />
            </div>
          </div>
        </>
      )}

      {/* produced  products  */}
      {product.length > 0 && (
        <>
          <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
            <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
              PRODUCED PRODUCTS STOCK <Download />
            </div>
            <Divider className="my-2" />

            <div className="grid gap-3 w-full manager_inventory_product_stock">
              {product?.map((product) => (
                <ProductSmall key={product?._id} product={product} no_decrement={true} />
              ))}
            </div>
          </div>
          <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
            <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
              PRODUCED PRODUCTS STOCK HISTORY{" "}
              <Download id={"product_stock_table"} />
            </div>
            <Divider className="my-2" />
            <div className="w-full">
              <PHistoryTable id={"product_stock_table"} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
