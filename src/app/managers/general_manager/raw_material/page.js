import RawMaterialCard from "@/components/cards/RawMaterialCard";
import Department from "@/lib/models/department.model";
import connectDB from "@/lib/mongoose";
import { Divider } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import mongoose from "mongoose";
import ProductCard from "@/components/cards/ProductCard";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function LowMaterialPage() {
  const session = await getServerSession(options);

  let department_id = session?.user?.department_id?._id;

  if (session?.user?.designation === "Admin") {
    department_id = cookies().get("department_id")?.value;
    if (!department_id) return notFound();
  }

  await connectDB();

  const materials = await Department.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(department_id),
      },
    },
    {
      $lookup: {
        from: "rawmaterials",
        localField: "_id",
        foreignField: "produced_by",
        as: "produced_materials",
      },
    },
    {
      $lookup: {
        from: "rawmaterials",
        localField: "_id",
        foreignField: "used_by",
        as: "used_materials",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "produced_by",
        as: "produced_products",
      },
    },
  ]);

  // console.log(materials);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* used materials */}
      {materials?.[0]?.used_materials?.length > 0 && (
        <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch max-h-[80dvh] overflow-y-scroll">
          <p className="text-2xl font-bold tracking-wide w-full">
            USED RAW MATERIAL
          </p>
          <Divider className="my-3" />{" "}
          <div className="grid lg:grid-cols-3 md:grid-rows-2 sm:grid-rows-1 gap-8">
            {/* <div className="lg:columns-3 md:columns-2 max-sm:columns-1 gap-8 space-y-8"> */}
            {materials?.[0]?.used_materials?.map((material) => (
              <RawMaterialCard
                no_dept={true}
                key={material?._id}
                material={material}
                card_only={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* produced materials */}
      {materials?.[0]?.produced_materials?.length > 0 && (
        <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch max-h-[80dvh] overflow-y-scroll">
          <p className="text-2xl font-bold tracking-wide w-full">
            PRODUCED RAW MATERIAL
          </p>
          <Divider className="my-3" />{" "}
          <div className="lg:columns-3 md:columns-2 max-sm:columns-1 gap-8 space-y-8">
            {materials?.[0]?.produced_materials?.map((material) => (
              <RawMaterialCard
                no_dept={true}
                key={material?._id}
                material={material}
                card_only={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* produced product */}
      {materials?.[0]?.produced_products?.length > 0 && (
        <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch max-h-[80dvh] overflow-y-scroll">
          <p className="text-2xl font-bold tracking-wide w-full">
            PRODUCED PRODUCT
          </p>
          <Divider className="my-3" />{" "}
          <div className="lg:columns-3 md:columns-2 max-sm:columns-1 gap-8 space-y-8">
            {materials?.[0]?.produced_products?.map((material) => (
              <ProductCard
                key={material?._id}
                product={material}
                card_only={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
